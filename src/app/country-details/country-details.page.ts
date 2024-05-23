import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class CountryDetailsPage implements OnInit {
 
  flag: string = "";
  countryName: string = "";
  capital: string = "";
  currency: string[] = [];
  currency2: any;
  population: string ="";
  languag: any [] = [];

  // url to get weather info before concat()
  options2: HttpOptions = {
    url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/?key="
  }


// variables used, I didn't initialise inside life-cycle hook
  key: string = "2S4J5KLSARPVV3SMQBS5DACFA";
 // access key value from .env file
 //key = process.env['VISUAL_CROSSING_API_KEY'];
  weather: any = {};
  weather2: any;
  capitalInfo: any = [];
  lat: any;
  long: any;

  constructor(private mds: DataService, private mhs: MyHttpService) { }


// angular life-cycle hook, called methods to get info
  ngOnInit() {
    this.getCountryDetails();
    this.getCountryCurrency();
    this.lat= "";
    this.long = "";
    this.getCapitalInfo()
    this.weather2 = "";
    this.currency2 = "";
  }

  // ionic life-cycle hook
  ionViewWillEnter(){
    this.getLanguages();
  }




// this is the logic for the country details



  // got data from storage, assigned variables to certain data elements needed
  async getCountryDetails(){
    var result = await this.mds.get("myCountry")
    // console.log(JSON.stringify(result));
    this.countryName = result.name.official;
    // console.log(JSON.stringify(this.countryName));
    this.flag = result.flags.png;
    this.capital= result.capital[0];
    
    this.population= result.population;
    this.capitalInfo = result.capitalInfo.latlng;
 }


// get currency data, push into an array, access 1st element
 async getCountryCurrency(){
  var result = await this.mds.get("myCountry")
  for (const cur in result.currencies){
    this.currency.push(cur)
     this.currency2 = this.currency[0]; 

  }
 }

  // individual method for extra logic to get languages from country details
  async getLanguages(){
    var result = await this.mds.get("myCountry")
    this.languag = result.languages;
    // console.log(this.languag);
    // Object { prs: "Dari", pus: "Pashto", tuk: "Turkmen" }
    this.languag = Object.values(result.languages);
    // console.log(this.languag);
    // Dari,Pashto,Turkmen
  }



   // get CapitalInfo from storage
  async getCapitalInfo(){
    var result = await this.mds.get("myCountry")
    // console.log(JSON.stringify(result)); 
    this.capitalInfo = result.capitalInfo.latlng;
    this.lat = this.capitalInfo[0]; 
    // console.log(this.lat)
    this.long = this.capitalInfo[1];
    //console.log(this.long); 
   
   this.options2.url = this.options2.url.concat(this.lat,",",this.long,this.key);
    this.getWeather();
    this.getWeatherInfo();
   // console.log(this.options2.url);
   }





   // this is the logic for the weather




    // get weather from url, then call method to put into storage
  async getWeather(){
    var result = await this.mhs.get(this.options2)
    this.weather = result.data;
    //console.log(this.weather)// shows url
    this.openWeatherDetails(this.weather)// call method
    }


    // put weather in storage
  async openWeatherDetails(weather: any){
    await this.mds.set("myWeather", weather)
    // this.router.navigate(['/country-details'])
    }


    // get weather out of storage
  async getWeatherInfo(){
    var result = await this.mds.get("myWeather")
    this.weather = result;
    this.weather2 = result.description;
    //console.log(this.weather);
    }






// this is the logic for the money converter






// what needs to be done to sample url, add currency and input to end
options4: HttpOptions = {
  url: "https://v6.exchangerate-api.com/v6/a00b0e085225f017486005af/pair/EUR/currency/inputAmount"
}

// bare url without the concat()
options3: HttpOptions = {
  url: "https://v6.exchangerate-api.com/v6/a00b0e085225f017486005af/pair/EUR/"
}

// variables used to store returned info
returnedAmount: any = {}; // data returned from storage
returnedAmount2 : any =""; // conversion element of data
inputAmount: any =""; // amount inputed by user


//click method from html where the user clicks and starts the currency conversion
    getConvertedAmount(){
    console.log(this.inputAmount)
    this.options3.url = this.options3.url.concat(this.currency2,"/",this.inputAmount);
    console.log(this.options3.url)
     this.getCurrency();
    this.getCurrencyInfo();
    }

    // get currency converted from url, then call method to put into storage
    async getCurrency(){
      var result = await this.mhs.get(this.options3)
      this.returnedAmount = result.data;
      console.log(this.returnedAmount)// shows url
      this.openCurrencyDetails(this.returnedAmount)// call method
      }
  
  
      // put currency in storage
    async openCurrencyDetails(symbol: any){
      await this.mds.set("myCurrency", symbol)
      }
  
  
      // get currency out of storage
    async getCurrencyInfo(){
      var result = await this.mds.get("myCurrency")
      this.returnedAmount2 = result.conversion_result;
      console.log(this.returnedAmount2);
        }

  

}







 






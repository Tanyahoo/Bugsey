import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule,IonicModule],
})
export class HomePage {


 
// url for countryDetails shorted which just relevant info that's needed
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/all?fields=name,capital,currencies,languages,population,flags,capitalInfo"
  }

  countries: any =[];
  constructor(private mhs: MyHttpService, private router: Router, private mds:DataService) {}

  // ionic lifecycle hook
  ionViewWillEnter(){
    this.getCountries();
    
    }


    // get country details from url
    async getCountries(){
      var result = await this.mhs.get(this.options)
      this.countries = result.data;
    }

    
    //we want to store the country that we clicked via html 'c' of countries
    //which is passed into this method as a param in the home html page, got this from lab
    async openCountryDetails(country: any){
      // save the country details to storage
      await this.mds.set("myCountry", country)
      this.router.navigate(['/country-details'])
      
    }


}
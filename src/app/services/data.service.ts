import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class DataService {

private _storage: Storage | null = null;


  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    // creates storage
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // puts a key value pair into storage
  async set(key: string, value: any){
    await this._storage?.set(key, value);
  }

  // gets key and its data value from storage
  async get(key: string){
    return await this. _storage?.get(key);
  }



}

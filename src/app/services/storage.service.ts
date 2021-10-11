import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  store(key: string, value: any) {
    sessionStorage[key] = JSON.stringify(value);
  }

  load(key: string, defaultValue = null) {
    var value = sessionStorage[key] || defaultValue;
    return JSON.parse(value);
  }

}

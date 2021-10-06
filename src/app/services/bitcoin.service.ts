import { Injectable } from '@angular/core';
import axios from "axios";
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private storageService: StorageService) { }

  async getRate(coins: number) {
    const storedRate = this.storageService.load('rate');

    if (storedRate == null) {
      let { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1');
      // res.data *= +coins;
      this.storageService.store('rate', 1 / data);
      return 1 / data;
    }
    console.log('from storage:', storedRate);
    return storedRate;
  }

  async getMarketPrice() {
    const storedPrice = this.storageService.load('market-price');

    if (storedPrice == null) {
      const priceJson = await axios.get('https://api.blockchain.info/charts/market-price?timespan=3months&format=json&cors=true');
      this.storageService.store('market-price', priceJson);
      return priceJson;
    }
    console.log('from storage:', storedPrice);
    return storedPrice;
  }

  async getConfirmedTransactions() {
    const storedTrx = this.storageService.load('trx');

    if (storedTrx == null) {
      const confirmedTrx = await axios.get('https://api.blockchain.info/charts/n-transactions?timespan=3months&format=json');
      this.storageService.store('trx', confirmedTrx);
      return confirmedTrx.data;
    }
    console.log('from storage:', storedTrx);
    return storedTrx;
  }

}

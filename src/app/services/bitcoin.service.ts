import { Injectable } from '@angular/core';
import axios from "axios";


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor() { }

  async getRate(coins: number) {
    let { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1');
    // res.data *= +coins;
    return 1/data;
  }

  async getMarketPrice() {
    return await axios.get('https://api.blockchain.info/charts/market-price?timespan=3months&format=json&cors=true');
  }

  getConfirmedTransactions() {

  }
}

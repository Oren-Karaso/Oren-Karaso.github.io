import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BitcoinService } from 'src/app/services/bitcoin.service';
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['../../styles/pages/statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  marketPrice!: any;
  marketPriceX!: [];
  marketPriceY!: [];

  confirmedTrx!: any;
  confirmedTrxX!: [];
  confirmedTrxY!: [];

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit() {
    await this.getPrice();
    this.marketPriceX = this.marketPrice.data.values.map((data: {x: number, y: number}, index: number) => {
      const timestamp = new Date(1000 * data.x);
      return timestamp.toLocaleDateString('en-IL');
    });
    this.marketPriceY = this.marketPrice.data.values.map((data: any) => data.y);
    
    await this.getTrx();
    this.confirmedTrxX = this.confirmedTrx.data.values.map((data: {x: number, y: number}, index: number) => {
      const timestamp = new Date(1000 * data.x);
      return timestamp.toLocaleDateString('en-IL');
    });
    this.confirmedTrxY = this.confirmedTrx.data.values.map((data: any) => data.y);

    const marketPriceChart = new Chart('market-price', {
      type: 'line',
      data: {
        labels: this.marketPriceX,
        datasets: [{
          label: 'Market Price of Last 3 months',
          data: this.marketPriceY,
          fill: true,
          backgroundColor: "#6ed0b3b6",
          borderColor: '#062720',
          borderWidth: 1,
          tension: 0.5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const confirmedTrxChart = new Chart('confirmed-trx', {
      type: 'line',
      data: {
        labels: this.confirmedTrxX,
        datasets: [{
          label: 'Confirmed Transactions per Day of Last 3 months',
          data: this.confirmedTrxY,
          fill: true,
          backgroundColor: "#e1daf6bb",
          borderColor: '#6f5caf',
          borderWidth: 1,
          tension: 0.5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  async getPrice() {
    this.marketPrice = await this.bitcoinService.getMarketPrice();
  }

  async getTrx() {
    this.confirmedTrx = await this.bitcoinService.getConfirmedTransactions();
  }
}

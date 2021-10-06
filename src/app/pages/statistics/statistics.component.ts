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
  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit() {
    await this.getPrice();
    this.marketPriceX = this.marketPrice.data.values.map((data: {x: number, y: number}, index: number) => {
      const timestamp = new Date(data.x);
      console.log(`timestamp:${index}`, timestamp.toDateString());
      return timestamp.toLocaleDateString('en-US');
    });
    this.marketPriceY = this.marketPrice.data.values.map((data: any) => data.y);

    const myChart = new Chart('line-chart', {
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
  }

  async getPrice() {
    this.marketPrice = await this.bitcoinService.getMarketPrice();
    // this.marketPriceX = this.marketPrice.values.forEach(value: {} => value.x);
  }
}

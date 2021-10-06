import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../styles/pages/homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  loggedInUser = new User('Oren Karaso', 100, []);
  currBitRate!: number;

  constructor(private bitCoinService: BitcoinService) { }

  ngOnInit() {
    this.getCurrBitRate();
  }

  async getCurrBitRate() {
    this.currBitRate = await this.bitCoinService.getRate(1);
  }

}

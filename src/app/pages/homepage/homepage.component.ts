import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../styles/pages/homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  loggedInUser = new User('Oren Karaso', 100, []);

  constructor() { }

  ngOnInit(): void {
  }

}

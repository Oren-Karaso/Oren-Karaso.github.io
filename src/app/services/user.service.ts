import { Injectable } from '@angular/core';
import { User } from '../modules/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
    image: 'https://robohash.org/Ochoa-Hyde.png?set=set5'
  }

  constructor() { }

  getUser() {
    return this.user;
  }

  addUser(user: User) {
  }
}

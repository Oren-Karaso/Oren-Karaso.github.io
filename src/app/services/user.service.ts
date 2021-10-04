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
  }

  constructor() { }

  getUser() {
    return this.user;
  }
}

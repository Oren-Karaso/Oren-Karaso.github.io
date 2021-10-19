import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users!: User[] 
  // = [{
  //   name: 'Oren Karaso',
  //   coins: 100,
  //   moves: [],
  //   image: 'https://robohash.org/Oren-Karaso.png?set=set5'
  // }]  add isLoggedIn

  constructor(private contactService: ContactService) { }

  getUser() {
    const loggedInUser = this.users.find(user => user.isLoggedIn);
    return loggedInUser ? loggedInUser : null;
  }

  signUser(user: User) {
  }

  addTransaction(contact: Contact, amount: number) {
  }
}

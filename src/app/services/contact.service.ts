import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { Contact } from '../modules/contact.model';
import { StorageService } from './storage.service';

const CONTACTS = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "name": "Ochoa Hyde",
    "email": "ochoahyde@renovize.com",
    "phone": "+1 (968) 593-3824",
    "img": "https://robohash.org/Ochoa-Hyde.png?set=set5"
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "name": "Hallie Mclean",
    "email": "halliemclean@renovize.com",
    "phone": "+1 (948) 464-2888",
    "img": "https://robohash.org/Hallie-Mclean.png?set=set5"
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "name": "Parsons Norris",
    "email": "parsonsnorris@renovize.com",
    "phone": "+1 (958) 502-3495",
    "img": "https://robohash.org/Parsons-Norris.png?set=set5"
  },
  {
    "_id": "5a566402ed1cf349f0b47b4d",
    "name": "Rachel Lowe",
    "email": "rachellowe@renovize.com",
    "phone": "+1 (911) 475-2312",
    "img": "https://robohash.org/Rachel-Lowe.png?set=set5"
  },
  {
    "_id": "5a566402abce24c6bfe4699d",
    "name": "Dominique Soto",
    "email": "dominiquesoto@renovize.com",
    "phone": "+1 (807) 551-3258",
    "img": "https://robohash.org/Dominique-Soto.png?set=set5"
  },
  {
    "_id": "5a566402a6499c1d4da9220a",
    "name": "Shana Pope",
    "email": "shanapope@renovize.com",
    "phone": "+1 (970) 527-3082",
    "img": "https://robohash.org/Shana-Pope.png?set=set5"
  },
  {
    "_id": "5a566402f90ae30e97f990db",
    "name": "Faulkner Flores",
    "email": "faulknerflores@renovize.com",
    "phone": "+1 (952) 501-2678",
    "img": "https://robohash.org/Faulkner-Flores.png?set=set5"
  },
  {
    "_id": "5a5664027bae84ef280ffbdf",
    "name": "Holder Bean",
    "email": "holderbean@renovize.com",
    "phone": "+1 (989) 503-2663",
    "img": "https://robohash.org/Holder-Bean.png?set=set5"
  },
  {
    "_id": "5a566402e3b846c5f6aec652",
    "name": "Rosanne Shelton",
    "email": "rosanneshelton@renovize.com",
    "phone": "+1 (968) 454-3851",
    "img": "https://robohash.org/Rosanne-Shelton.png?set=set5"
  },
  {
    "_id": "5a56640272c7dcdf59c3d411",
    "name": "Pamela Nolan",
    "email": "pamelanolan@renovize.com",
    "phone": "+1 (986) 545-2166",
    "img": "https://robohash.org/Pamela-Nolan.png?set=set5"
  },
  {
    "_id": "5a5664029a8dd82a6178b15f",
    "name": "Roy Cantu",
    "email": "roycantu@renovize.com",
    "phone": "+1 (929) 571-2295",
    "img": "https://robohash.org/Roy-Cantu.png?set=set5"
  },
  {
    "_id": "5a5664028c096d08eeb13a8a",
    "name": "Ollie Christian",
    "email": "olliechristian@renovize.com",
    "phone": "+1 (977) 419-3550",
    "img": "https://robohash.org/Ollie-Christian.png?set=set5"
  },
  {
    "_id": "5a5664026c53582bb9ebe9d1",
    "name": "Nguyen Walls",
    "email": "nguyenwalls@renovize.com",
    "phone": "+1 (963) 471-3181",
    "img": "https://robohash.org/Nguyen-Walls.png?set=set5"
  },
  {
    "_id": "5a56640298ab77236845b82b",

    "name": "Glenna Santana",
    "email": "glennasantana@renovize.com",
    "phone": "+1 (860) 467-2376",
    "img": "https://robohash.org/Glenna-Santana.png?set=set5"
  },
  {
    "_id": "5a56640208fba3e8ecb97305",
    "name": "Malone Clark",
    "email": "maloneclark@renovize.com",
    "phone": "+1 (818) 565-2557",
    "img": "https://robohash.org/Malone-Clark.png?set=set5"
  },
  {
    "_id": "5a566402abb3146207bc4ec5",
    "name": "Floyd Rutledge",
    "email": "floydrutledge@renovize.com",
    "phone": "+1 (807) 597-3629",
    "img": "https://robohash.org/Floyd-Rutledge.png?set=set5"
  },
  {
    "_id": "5a56640298500fead8cb1ee5",
    "name": "Grace James",
    "email": "gracejames@renovize.com",
    "phone": "+1 (959) 525-2529",
    "img": "https://robohash.org/Grace-James.png?set=set5"
  },
  {
    "_id": "5a56640243427b8f8445231e",
    "name": "Tanner Gates",
    "email": "tannergates@renovize.com",
    "phone": "+1 (978) 591-2291",
    "img": "https://robohash.org/Tanner-Gates.png?set=set5"
  },
  {
    "_id": "5a5664025c3abdad6f5e098c",
    "name": "Lilly Conner",
    "email": "lillyconner@renovize.com",
    "phone": "+1 (842) 587-3812",
    "img": "https://robohash.org/Lilly-Conner.png?set=set5"
  }
];

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //mock the server
  private _contactsDb: Contact[] = CONTACTS;

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();


  constructor(private storageService: StorageService) {

  }

  public loadContacts(name?: string) {
    let contacts = this.storageService.load('charleyDB') || this._contactsDb;
    if (name && name !== '') contacts = this._filter(contacts, name)
    this._contacts$.next(this._sort(contacts));
    return contacts;
  }

  // public loadContacts(filterBy = null): void {
  //   let contacts = this._contactsDb;
  //   if (filterBy && filterBy.term) {
  //     contacts = this._filter(contacts, filterBy.term)
  //   }
  //   this._contacts$.next(this._sort(contacts))
  // }

  private _addContact(contact: Contact) {
    //mock the server work
    const newContact = new Contact;  // how to use with the class constructor?
    newContact.name = contact.name;
    newContact.email = contact.email;
    newContact.phone = contact.phone;

    if (newContact.setId) newContact.setId();

    newContact.img = `https://robohash.org/${contact.name}.png?set=set5`;

    this._contactsDb.push(newContact);
    this._contacts$.next(this._sort(this._contactsDb));
    this.storageService.store('charleyDB', this._contactsDb);
  }

  public getContactById(id: string): Observable<Contact> {
    //mocks the server work
    const contact = this._contactsDb.find(contact => contact._id === id)
    // console.log('contact from service:', contact);
    //returns an observable
    return contact ? of(contact) : throwError(`Contact id ${id} not found!`);
  }

  public deleteContact(id: string | undefined) {
    //mocks the server work
    this._contactsDb = this._contactsDb.filter(contact => contact._id !== id);
    // changes the observable data in the service - let all the subscribers know
    this._contacts$.next(this._contactsDb);
    this.storageService.store('charleyDB', this._contactsDb);
  }

  public saveContact(contact: Contact) {
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  private _updateContact(contact: Contact) {
    //mock the server work
    this._contactsDb = this._contactsDb.map(c => contact._id === c._id ? contact : c)
    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._sort(this._contactsDb))
    this.storageService.store('charleyDB', this._contactsDb);
  }


  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1;
      return (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) ? 1 : 0;
    });
  }

  private _filter(contacts: Contact[], term: string) {
    term = term.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(term);
      // return contact.name.toLocaleLowerCase().includes(term) ||
      //   contact.phone.toLocaleLowerCase().includes(term) ||
      //   contact.email.toLocaleLowerCase().includes(term)
    })
  }
}
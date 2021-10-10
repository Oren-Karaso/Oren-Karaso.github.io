import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/modules/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../styles/pages/contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactList!: Contact[];
  contactsChangedSub = new Subscription;

  constructor(private contactListService: ContactService) { }


  ngOnInit() {
    this.contactsChangedSub = this.contactListService.contactsChanged.subscribe(
      (contactList: Contact[]) => {
        this.contactList = contactList;
      });
   
    this.contactList = this.contactListService.loadContacts();
  }

  ngOnDestroy() {
    this.contactsChangedSub.unsubscribe();
  }

}

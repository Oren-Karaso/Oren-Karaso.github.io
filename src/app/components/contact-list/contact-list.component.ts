import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/modules/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../styles/components/contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contactList: Contact[] = [];
  subscription: Subscription = new Subscription;

  constructor(private contactListService: ContactService) {}


  ngOnInit() {
    this.subscription = this.contactListService.contacts$.subscribe(
      (contactList: Contact[]) => {
        this.contactList = contactList;
      });
      this.contactList = this.contactListService.loadContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

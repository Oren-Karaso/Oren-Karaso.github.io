import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isShown = true;

  constructor(private contactListService: ContactService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.contactsChangedSub = this.contactListService.contacts$.subscribe(
      (contactList: Contact[]) => {
        this.contactList = contactList;
      });

    this.contactList = this.contactListService.loadContacts();
  }

  onHideList() {
    this.isShown = false;
  }

  ngOnDestroy() {
    this.contactsChangedSub.unsubscribe();
  }

}

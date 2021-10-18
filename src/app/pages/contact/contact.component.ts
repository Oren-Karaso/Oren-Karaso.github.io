import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/modules/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { SubjectService } from 'src/app/services/subject.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../styles/pages/contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactList!: Contact[];
  contactsChangedSub = new Subscription;
  isShown = true;
  delContact = new Subscription;

  constructor(private contactListService: ContactService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.contactsChangedSub = this.contactListService.contacts$.subscribe(
      (contactList: Contact[]) => {
        this.contactList = contactList;
      });

      // this.delContact = this.subjectService.deleteContact().subscribe(
      //   (contactId: string) => {
      //     this.deleteContact(contactId);
      //   });

    this.contactList = this.contactListService.loadContacts();
  }

  onHideList() {
    this.isShown = false;
  }

  deleteContact(id: string) {                   // no need here if using the contactService on details-component
    this.contactListService.deleteContact(id);
  }

  ngOnDestroy() {
    this.contactsChangedSub.unsubscribe();
    this.delContact.unsubscribe();
  }

}

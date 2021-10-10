import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/modules/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../styles/components/contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contactList!: Contact[];

  constructor() { }


  ngOnInit() {
  }

}

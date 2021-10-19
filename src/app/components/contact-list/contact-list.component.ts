import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../styles/components/contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contactList!: Contact[];
  @Output() isShown = new EventEmitter();

  constructor() { }


  ngOnInit() {
  }

  hideList(ev: Event) {
    this.isShown.emit('contact-chosen');
  }

}

import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Contact } from 'src/app/modules/contact.model';
@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['../../../styles/components/contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact!: Contact;
  @Input() index!: number;
  @Output() contactChosen = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onChooseContact() {
    this.contactChosen.emit('true');
  }
}


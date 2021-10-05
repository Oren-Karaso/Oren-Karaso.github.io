import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['../../styles/components/contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'name': new FormControl(null)
    });
  }

  onSubmit() {
    if (this.searchForm.value) {
      this.contactService.loadContacts(this.searchForm.get('name')!.value);
    }
  }
  
  onKeyPress(event: any) {
    console.log(this.searchForm.get('name')!.value);
    if (this.searchForm.value && this.searchForm.value !== '') {
      this.contactService.loadContacts(this.searchForm.get('name')!.value);
    } 
    else {
      this.contactService.loadContacts();
    }
  }
}

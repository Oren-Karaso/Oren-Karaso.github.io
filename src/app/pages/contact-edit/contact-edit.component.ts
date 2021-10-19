import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['../../styles/pages/contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  contactEditForm!: FormGroup;
  idsubscription!: Subscription;
  contact = new Contact;
  editMode = false;

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    let contactId = this.route.snapshot.params['id?'];
    if (contactId.length == 24) this.editMode = true; // 24 is the id length the the function in the module gives

    if (this.editMode) {
      this.idsubscription = this.contactService.getContactById(contactId).subscribe(
        (contact: Contact) => {
          this.contact = contact;
        });

      this.contactEditForm = new FormGroup({
        'contactData': new FormGroup({
        'username': new FormControl(this.contact.name, Validators.required),
        'email': new FormControl(this.contact.email, [Validators.required, Validators.email]),
        'phone': new FormControl(this.contact.phone, Validators.required)
        }),
      });
    } else {

      this.contactEditForm = new FormGroup({
        'contactData': new FormGroup({
          'username': new FormControl(null, Validators.required),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'phone': new FormControl(null, Validators.required)
        }),
      });
    }
  }

  onSubmit() {
    console.log('form:', this.contactEditForm.value);

    // this.contact.name = this.contactEditForm.value['contactData.username'],
    // this.contact.email = this.contactEditForm.value['contactData.email'],
    // this.contact.phone = this.contactEditForm.value['contactData.phone'],

    this.contact.name = this.contactEditForm.get('contactData.username')?.value;
    this.contact.email = this.contactEditForm.get('contactData.email')?.value;
    this.contact.phone = this.contactEditForm.get('contactData.phone')?.value;
    console.log('contact:', this.contact);


    this.contactService.saveContact(this.contact);
    this.router.navigate(['/contact']);
  }

  ngOnDestroy() {
    if (this.idsubscription) this.idsubscription.unsubscribe();
  }

}

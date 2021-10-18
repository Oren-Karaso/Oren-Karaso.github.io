import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/modules/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['../../styles/pages/contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  @Input() contact!: Contact;
  paramsSubscription = new Subscription;
  getByIdSubscription = new Subscription;

  constructor(private contactsService: ContactService, private router: Router,
              private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.getByIdSubscription = this.contactsService.getContactById(id).subscribe(
      (contact: Contact) => {
        this.contact = contact;
      });

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        id = params['contact._id'];
      });
  }

  onDelete() {          // actually there is no reason to not just use the contactService here
    this.contactsService.deleteContact(this.contact._id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.getByIdSubscription.unsubscribe();
  }

}

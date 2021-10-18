import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
   subject = new ReplaySubject<string>();

  onDeleteContact(id: string | undefined) {  // can be called only from details-component.ts
    this.subject.next(id);
  }
  
  deleteContact() {                         // can be called only from contact-component.ts
    return this.subject.asObservable();
  }


}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFilterComponent } from './components/contact-filter/contact-filter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactPreviewComponent } from './components/contact-preview/contact-preview.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    HomepageComponent,
    ContactFilterComponent,
    ContactListComponent,
    ContactPreviewComponent,
    HeaderComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

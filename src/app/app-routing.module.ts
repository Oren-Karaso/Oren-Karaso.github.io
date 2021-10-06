import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  {
    path: 'contact', component: ContactComponent, children: [
      // { path: '', component: ChooseContactComponent},
      { path: ':id', component: ContactDetailsComponent },
      { path: ':id/edit', component: ContactEditComponent },
      // { path: ''}
    ]
  },
  { path: 'charts', component: StatisticsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

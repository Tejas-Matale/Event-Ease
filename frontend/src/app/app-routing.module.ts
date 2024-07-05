import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { EventPageComponent } from './components/pages/event-page/event-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { NewEventComponent } from './components/pages/new-event/new-event.component';
import { EditEventComponent } from './components/pages/edit-event/edit-event.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'event/:_id', component: EventPageComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'add', component: NewEventComponent },
  { path: 'event/edit/:id', component: EditEventComponent },
  { path: 'login', component: LoginPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

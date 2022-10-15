import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ChooseCardComponent } from './choose-card/choose-card.component';
import { DemoComponent } from './demo/demo.component';
import { FeaturesComponent } from './features/features.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PricingComponent } from './pricing/pricing.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SuperuserDashboardComponent } from './superuser-dashboard/superuser-dashboard.component';
import { TeamsDashboardComponent } from './teams-dashboard/teams-dashboard.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { UserDashboardNavComponent } from './user-dashboard-nav/user-dashboard-nav.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'home/:id', component:HomeComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'chooseCard', component:ChooseCardComponent},
  {path: 'userDashboard', component:UserDashboardComponent},
  {path: 'superuserDashboard', component:SuperuserDashboardComponent},
  {path: 'teamsDashboard', component:TeamsDashboardComponent},
  {path: 'createCard', component:CreateCardComponent},
  {path: 'userDashboardNav', component:UserDashboardNavComponent},
  {path: 'cardPreview', component:CardPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, SignupComponent, ChooseCardComponent, DemoComponent, FeaturesComponent, PricingComponent, ContactusComponent,
UserDashboardComponent, SuperuserDashboardComponent, TeamsDashboardComponent, CreateCardComponent, UserDashboardNavComponent, CardPreviewComponent]

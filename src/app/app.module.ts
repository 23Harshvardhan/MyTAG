import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { ChooseCardComponent } from './choose-card/choose-card.component';
import { DemoComponent } from './demo/demo.component';
import { FeaturesComponent } from './features/features.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PricingComponent } from './pricing/pricing.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SuperuserDashboardComponent } from './superuser-dashboard/superuser-dashboard.component';
import { TeamsDashboardComponent } from './teams-dashboard/teams-dashboard.component';
import { UserDashboardNavComponent } from './user-dashboard-nav/user-dashboard-nav.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    ChooseCardComponent,
    DemoComponent,
    FeaturesComponent,
    ContactusComponent,
    PricingComponent,
    CreateCardComponent,
    UserDashboardComponent,
    SuperuserDashboardComponent,
    TeamsDashboardComponent,
    UserDashboardNavComponent,
    CardPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

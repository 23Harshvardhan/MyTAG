import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

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
import { InventoryComponent } from './inventory/inventory.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { CreateCardTeamComponent } from './create-card-team/create-card-team.component';
import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SuperuserEmailSignatureComponent } from './superuser-email-signature/superuser-email-signature.component';
import { SuperuserAnalyticsComponent } from './superuser-analytics/superuser-analytics.component';
import { ManagePaymentComponent } from './manage-payment/manage-payment.component';
import { SuperuserSettingsComponent } from './superuser-settings/superuser-settings.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { VerticalNavComponent } from './vertical-nav/vertical-nav.component';

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
    CardPreviewComponent,
    InventoryComponent,
    HowitworksComponent,
    CreateCardTeamComponent,
    EmailSignatureComponent,
    AnalyticsComponent,
    SuperuserEmailSignatureComponent,
    SuperuserAnalyticsComponent,
    ManagePaymentComponent,
    SuperuserSettingsComponent,
    ResetPasswordComponent,
    VerifyMailComponent,
    VerticalNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
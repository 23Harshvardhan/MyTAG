import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxVcardModule } from "ngx-vcard";

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
import { TeamsDashboardComponent } from './teams-dashboard/teams-dashboard.component';
import { UserDashboardNavComponent } from './user-dashboard-nav/user-dashboard-nav.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { CreateCardTeamComponent } from './create-card-team/create-card-team.component';
import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ManagePaymentComponent } from './manage-payment/manage-payment.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { VerticalNavComponent } from './vertical-nav/vertical-nav.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminVertNavbarComponent } from './admin-vert-navbar/admin-vert-navbar.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ActiveCardsComponent } from './active-cards/active-cards.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminCardPreviewComponent } from './admin-card-preview/admin-card-preview.component';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';

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
    TeamsDashboardComponent,
    UserDashboardNavComponent,
    CardPreviewComponent,
    InventoryComponent,
    HowitworksComponent,
    CreateCardTeamComponent,
    EmailSignatureComponent,
    AnalyticsComponent,
    ManagePaymentComponent,
    ResetPasswordComponent,
    VerifyMailComponent,
    VerticalNavComponent,
    UserSettingsComponent,
    AdminLoginComponent,
    EditCardComponent,
    AdminSettingsComponent,
    AdminVertNavbarComponent,
    ViewCardComponent,
    DashboardComponent,
    AccountsComponent,
    ActiveCardsComponent,
    OrdersComponent,
    AdminCardPreviewComponent,
    UserInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
    NgxVcardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
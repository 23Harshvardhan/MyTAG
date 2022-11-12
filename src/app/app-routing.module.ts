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
import { InventoryComponent } from './inventory/inventory.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { CreateCardTeamComponent } from './create-card-team/create-card-team.component';
import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SuperuserAnalyticsComponent } from './superuser-analytics/superuser-analytics.component';
import { SuperuserEmailSignatureComponent } from './superuser-email-signature/superuser-email-signature.component';
import { ManagePaymentComponent } from './manage-payment/manage-payment.component';
import { SuperuserSettingsComponent } from './superuser-settings/superuser-settings.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { VerticalNavComponent } from './vertical-nav/vertical-nav.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EditCardComponent } from './edit-card/edit-card.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component:HomeComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'chooseCard', component:ChooseCardComponent},
  {path: 'demo', component:DemoComponent},
  {path: 'features', component:FeaturesComponent},
  {path: 'contactus', component:ContactusComponent},
  {path: 'pricing', component:PricingComponent},
  {path: 'userDashboard', component:UserDashboardComponent},
  {path: 'superuserDashboard', component:SuperuserDashboardComponent},
  {path: 'teamsDashboard', component:TeamsDashboardComponent},
  {path: 'createCard', component:CreateCardComponent},
  {path: 'userDashboardNav', component:UserDashboardNavComponent},
  {path: 'cardPreview', component:CardPreviewComponent},
  {path: 'inventory', component:InventoryComponent},
  {path: 'howitworks', component:HowitworksComponent},
  {path: 'createCardTeam', component:CreateCardTeamComponent},
  {path: 'emailSignature', component:EmailSignatureComponent},
  {path: 'analytics', component:AnalyticsComponent},
  {path: 'superuserAnalytics', component:SuperuserAnalyticsComponent},
  {path: 'superuserEmailSignature', component:SuperuserEmailSignatureComponent},
  {path: 'managePaymentGateway', component:ManagePaymentComponent},
  {path: 'superuserSettings', component:SuperuserSettingsComponent},
  {path: 'resetPassword', component:ResetPasswordComponent},
  {path: 'verifyMail', component:VerifyMailComponent},
  {path: 'verticalNav', component:VerticalNavComponent},
  {path: 'userSettings', component:UserSettingsComponent},
  {path: 'adminLogin', component:AdminLoginComponent},
  {path: 'editCard/:id', component:EditCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, SignupComponent, ChooseCardComponent, DemoComponent, FeaturesComponent, PricingComponent, ContactusComponent,
UserDashboardComponent, SuperuserDashboardComponent, TeamsDashboardComponent, CreateCardComponent, UserDashboardNavComponent, CardPreviewComponent, InventoryComponent, 
HowitworksComponent, CreateCardTeamComponent, EmailSignatureComponent, AnalyticsComponent, SuperuserAnalyticsComponent, SuperuserEmailSignatureComponent, ManagePaymentComponent,
SuperuserSettingsComponent, ResetPasswordComponent, VerifyMailComponent, VerticalNavComponent, UserSettingsComponent, AdminLoginComponent, EditCardComponent]

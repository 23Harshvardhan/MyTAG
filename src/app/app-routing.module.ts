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
import { TeamsDashboardComponent } from './teams-dashboard/teams-dashboard.component';
import { CreateCardComponent } from './create-card/create-card.component';
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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminCardPreviewComponent } from './admin-card-preview/admin-card-preview.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
  {path: 'teamsDashboard', component:TeamsDashboardComponent},
  {path: 'createCard', component:CreateCardComponent},
  {path: 'userDashboardNav', component:UserDashboardNavComponent},
  {path: 'cardPreview/:id', component:CardPreviewComponent},
  {path: 'inventory', component:InventoryComponent},
  {path: 'howitworks', component:HowitworksComponent},
  {path: 'createCardTeam', component:CreateCardTeamComponent},
  {path: 'emailSignature', component:EmailSignatureComponent},
  {path: 'analytics', component:AnalyticsComponent},
  {path: 'managePaymentGateway', component:ManagePaymentComponent},
  {path: 'resetPassword', component:ResetPasswordComponent},
  {path: 'verifyMail', component:VerifyMailComponent},
  {path: 'verticalNav', component:VerticalNavComponent},
  {path: 'userSettings', component:UserSettingsComponent},
  {path: 'adminLogin', component:AdminLoginComponent},
  {path: 'editCard/:id', component:EditCardComponent},
  {path: 'adminDashboard', component:AdminDashboardComponent},
  {path: 'adminSettings', component:AdminSettingsComponent},
  {path: 'allUsers', component:AllUsersComponent},
  {path: 'adminCardPreview/:id', component:AdminCardPreviewComponent},
  {path: 'viewCard/:id', component:ViewCardComponent},
  {path: 'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, SignupComponent, ChooseCardComponent, DemoComponent, FeaturesComponent, PricingComponent, ContactusComponent,
  UserDashboardComponent, TeamsDashboardComponent, CreateCardComponent, UserDashboardNavComponent, CardPreviewComponent, InventoryComponent, AllUsersComponent,
  HowitworksComponent, CreateCardTeamComponent, EmailSignatureComponent, AnalyticsComponent, ManagePaymentComponent, ResetPasswordComponent, VerifyMailComponent, 
  VerticalNavComponent, UserSettingsComponent, AdminLoginComponent, EditCardComponent, AdminDashboardComponent,AdminSettingsComponent, AdminCardPreviewComponent, ViewCardComponent,
  DashboardComponent
]
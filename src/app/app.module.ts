import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatRadioModule,
  MatSliderModule
  // MatRadioButton,
  // MatRadioGroup
} from '@angular/material';

import { AppComponent } from './app.component';
import { MemberProfileCreateComponent } from './members/member-profile-create/member-profile-create.component';
import { HeaderComponent } from './header/header.component';
import { MemberProfileInfoComponent } from './members/member-profile-info/member-profile-info.component';
import { TrainerProfileCreateComponent } from './trainers/trainer-profile-create/trainer-profile-create.component';
import { TrainerProfileInfoComponent } from './trainers/trainer-profile-info/trainer-profile-info.component';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  { path: '', component: HomeComponent},
  { path: 'create-member', component: MemberProfileCreateComponent },
  { path: 'edit-member/:memberId', component: MemberProfileCreateComponent },
  { path: 'members', component: MemberProfileInfoComponent },
  { path: 'create-trainer', component: TrainerProfileCreateComponent },
  { path: 'trainers', component: TrainerProfileInfoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MemberProfileCreateComponent,
    MemberProfileInfoComponent,
    TrainerProfileCreateComponent,
    TrainerProfileInfoComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatRadioModule,
    MatSliderModule,
    // MatRadioButton,
    // MatRadioGroup,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

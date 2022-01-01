import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiPagesComponent } from './ui-pages/ui-pages.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ValidateEqualModule } from 'ng-validate-equal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, DashboardComponent, UiPagesComponent, SignupComponent, SigninComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,ValidateEqualModule,NgbModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

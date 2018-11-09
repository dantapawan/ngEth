import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MetaModule } from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

import { NgProgressModule } from 'ngx-progressbar';

import { LoginComponent } from './components/login/login.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IpfsComponent } from './components/ipfs/ipfs.component';
import { HomeComponent } from './components/home/home.component';
import { IpfsService } from './services/ipfs.service';
import { EthService } from './services/eth.service';
import { MainComponent } from './components/main/main.component';
import { StudentsService } from './services/students.service';
import { StudentSearchComponent } from './components/student-search/student-search.component';
import { GraduatesComponent } from './components/graduates/graduates.component';
import { RecruitersComponent } from './components/recruiters/recruiters.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    FooterComponent,
    IpfsComponent,
    HomeComponent,
    MainComponent,
    StudentSearchComponent,
    GraduatesComponent,
    RecruitersComponent,
    RegisterComponent,
    ContactusComponent,
    AboutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgProgressModule,
    MetaModule,
    AppRoutingModule
  ],
  providers: [IpfsService, EthService, StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

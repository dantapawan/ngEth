import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IpfsComponent } from './components/ipfs/ipfs.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { StudentSearchComponent } from './components/student-search/student-search.component';
import { GraduatesComponent } from './components/graduates/graduates.component';
import { RecruitersComponent } from './components/recruiters/recruiters.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutComponent } from './components/about/about.component';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
        path: 'ngEdu',
        component: MainComponent
    },
    {
        path: 'ipfs',
        component: IpfsComponent
    },
    {
        path: 'studentSearch',
        component: StudentSearchComponent
    },
    {
      path: 'graduates',
      component: GraduatesComponent
    },
    {
      path: 'recruiters',
      component: RecruitersComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'contactus',
      component: ContactusComponent
    }

];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        {
          enableTracing: true, // <-- debugging purposes only
        }
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [
    ]
  })
export class AppRoutingModule { }

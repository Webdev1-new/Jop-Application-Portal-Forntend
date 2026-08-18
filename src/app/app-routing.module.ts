import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostnewjobComponent } from './postnewjob/postnewjob.component';
import { JoblistingsComponent } from './joblistings/joblistings.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { EmployerdashboardComponent } from './employerdashboard/employerdashboard.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { InterviewComponent } from './interview/interview.component';
import { LatestJobsComponent } from './latest-jobs/latest-jobs.component';

const routes: Routes = [
  {path: '' , component : HomeComponent, pathMatch: "full"},
  {path: "login" , component : LoginComponent},
  {path: "registration" , component : RegistrationComponent},
  {path: "postjob" , component : PostnewjobComponent},
  {path: "jobs" , component : JoblistingsComponent},
  {path: "jobdetails/:id", component : JobdetailsComponent},
  {path: "employerdashboard" , component : EmployerdashboardComponent},
  {path: "applicants/:jobId" , component : ApplicantsComponent},
  {path: "interview" , component : InterviewComponent},
  {path: "latestjob" , component : LatestJobsComponent},
  {path: "**" , component : HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

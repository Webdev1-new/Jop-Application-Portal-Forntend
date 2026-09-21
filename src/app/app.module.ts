import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule } from  '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { PostnewjobComponent } from './postnewjob/postnewjob.component';
import { JoblistingsComponent } from './joblistings/joblistings.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { EmployerdashboardComponent } from './employerdashboard/employerdashboard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { ApplicantsComponent } from './applicants/applicants.component';
import { InterviewComponent } from './interview/interview.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LatestJobsComponent } from './latest-jobs/latest-jobs.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InterviewFeedbackComponent } from './interview-feedback/interview-feedback.component';
import { JobapplicationstatusComponent } from './jobapplicationstatus/jobapplicationstatus.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PostnewjobComponent,
    JoblistingsComponent,
    JobdetailsComponent,
    EmployerdashboardComponent,
    ApplicantsComponent,
    InterviewComponent,
    LatestJobsComponent,
    InterviewFeedbackComponent,
    JobapplicationstatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatChipsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

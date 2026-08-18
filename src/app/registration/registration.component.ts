import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { IntegrationService } from '../integration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  isemployer: boolean = false;

  constructor(private apiservice:IntegrationService,private router: Router){

  }


  employerRegistrationForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('', Validators.required),
    employerId : new FormControl('',Validators.required),
    companyName : new FormControl('',Validators.required),
    emailId : new FormControl('',Validators.required),
    mobileno : new FormControl('',Validators.required),
    phoneno :  new FormControl('',Validators.required),
    companyAddress : new FormControl('',Validators.required),
    state : new FormControl('',Validators.required),
    countrycode : new FormControl('',Validators.required),
    gstnumber : new FormControl('',Validators.required)
  })


  jobSeekerRegistrationForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('', Validators.required),
    resume : new FormControl('',Validators.required),
    phoneno : new FormControl('',Validators.required),
    notification : new FormControl('',Validators.required),
    address : new FormControl('',Validators.required)
  })

  registerJobseekerForm(){
   this.isemployer = false;
  }

  registerEmployerScreen(){
    this.isemployer =true;
  }

  loginUser(){
    this.router.navigate(['/login']);
  }


  registerEmployer(){
    this.apiservice.register(JSON.stringify(this.employerRegistrationForm.value)).subscribe(
      (data) => console.log("Successfully register employer"),
      (err) => console.log("Error while registering user"),     
      () => console.log("Registration successfully completed")
    );

  }

  registerApplicant(){
   this.apiservice.registerJobApplicant(JSON.stringify(this.jobSeekerRegistrationForm.value)).subscribe(
      (data) => console.log("Successfully register employer"),
      (err) => console.log("Error while registering user"),     
      () => console.log("Registration successfully completed")
    );
  }




}

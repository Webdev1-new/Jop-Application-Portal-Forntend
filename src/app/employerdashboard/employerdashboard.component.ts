import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from '../logged-in-user';

@Component({
  selector: 'app-employerdashboard',
  templateUrl: './employerdashboard.component.html',
  styleUrls: ['./employerdashboard.component.css']
})
export class EmployerdashboardComponent implements OnInit{

   totalJobs : any;
   totalApplicants : any;
   activeJobs : any;
   jobs : any[] = [];

   constructor(private restService : IntegrationService,private routes :ActivatedRoute,private router : Router){

   }


   ngOnInit(): void {    
      let user = localStorage.getItem("username");
      if(user){
        const users : LoggedInUser = JSON.parse(user);
        this.restService.fetchJobPostings(users.username).subscribe(
          (data) =>{
            this.jobs = data;
          },
          (err) => {console.log("Error while fteching jobs")}
        )      
      }     
   }

   applicant(jobId:string){
     console.log("Applicant jobId " + jobId);
     this.router.navigate(['/applicants',jobId]);
     
   }

   

}

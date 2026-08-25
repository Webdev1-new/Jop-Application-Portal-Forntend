import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit{

   applicants : any[] = [];

   constructor(private routes: ActivatedRoute , private apiService : IntegrationService, private router : Router){

   }

  ngOnInit(): void {
    this.routes.paramMap.subscribe((params) => {
      let ids: any =   params.get("jobId");
      console.log("Recieved jodId is" + ids);
      if(ids){
        console.log("Recieved jodId is" + ids);
        this.apiService.applicants(ids).subscribe((data) =>{
           this.applicants = data;
        },
      (err) => console.log(err));
      }
    })
  }

  openScheduleInterview(application:any){
    console.log("schedule intervapplication.applicantId " + " "+ application.jobId + " "+application.applicationId);
    this.router.navigate(['/interview'],
      { queryParams : {applicantId: application.applicationId , jobId : application.jobId , name  : application.name ,
        email : application.email
      }});
  }


  updateInterviewFeedback(applicant:any) {  
    console.log("providing interview feedback");
    this.router.navigate(['/interview/feedback'],
      { queryParams : {applicantId: applicant.applicationId , jobId : applicant.jobId , name  : applicant.name ,
        email : applicant.email
      }}
    )
  }
}

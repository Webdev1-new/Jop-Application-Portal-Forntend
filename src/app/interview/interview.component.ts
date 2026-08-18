import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntegrationService } from '../integration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit{

  constructor(private apiService: IntegrationService,private routes: ActivatedRoute){

  }

  ngOnInit(): void {

     this.routes.queryParamMap.subscribe((params) => {
        
       let applicantIds = params.get('applicantId');
       let jobIds = params.get('jobId');
       let applicantName = params.get('name');
       let applicantEmail = params.get('email');
       this.scheduleInterviewForm.patchValue({
        applicantId : applicantIds,
        jobId : jobIds,
        applicantName :  applicantName,
        applicantEmail :  applicantEmail
       });
     })
  }

  scheduleInterviewForm = new FormGroup({

  applicantId: new FormControl(''),
  jobId: new FormControl(''),
  applicantName : new FormControl(''),
  applicantEmail : new FormControl(''),

  interviewRound: new FormControl('', Validators.required),
  interviewDate: new FormControl('', Validators.required),
  interviewTime: new FormControl('', Validators.required),

  interviewMode: new FormControl('ONLINE'),
  meetingLink: new FormControl(''),

  interviewerName: new FormControl('', Validators.required),
  interviewerEmail: new FormControl(''),

  remarks: new FormControl(''),

  interviewStatus: new FormControl('SCHEDULED'),

  technicalFeedback: new FormGroup({
    reviewerName: new FormControl(''),
    reviewerEmail: new FormControl(''),
    rating: new FormControl(''),
    result: new FormControl('PENDING'),
    feedback: new FormControl('')
  }),

  managerialFeedback: new FormGroup({
    reviewerName: new FormControl(''),
    reviewerEmail: new FormControl(''),
    rating: new FormControl(''),
    result: new FormControl('PENDING'),
    feedback: new FormControl('')
  }),

  hrFeedback: new FormGroup({
    reviewerName: new FormControl(''),
    reviewerEmail: new FormControl(''),
    rating: new FormControl(''),
    result: new FormControl('PENDING'),
    feedback: new FormControl('')
  }),

  finalResult: new FormControl('PENDING')
});




 submitInterviewFeedback(){

    this.apiService.submitInterviewDetails(JSON.stringify(this.scheduleInterviewForm.value)).subscribe(
      (data) => console.log("interview scheduled successfully"),
      (err) => console.log("Error while fteching details"),
      () => console.log("done")
    )

 }

 updateInterviewFeedback(){

     this.apiService.submitInterviewDetails(JSON.stringify(this.scheduleInterviewForm.value)).subscribe(
      (data) => console.log("interview scheduled successfully"),
      (err) => console.log("Error while fteching details"),
      () => console.log("done")
    )
 }
}

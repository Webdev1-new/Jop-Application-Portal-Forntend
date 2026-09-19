import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IntegrationService } from '../integration.service';
import { ActivatedRoute } from '@angular/router';
import { Interviewfeedback } from '../interviewfeedback';
import { LoggedInUser } from '../logged-in-user';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.css']
})
export class InterviewFeedbackComponent {


  interviewFeedbackForm!: FormGroup;
  applicationId:string=""; 
  jobIds:string=""; 
  applicantName:string="";
  applicantEmail:string="";

  constructor(private fb: FormBuilder,private restApi:IntegrationService,private routes: ActivatedRoute) {}

  ngOnInit(): void {

      this.routes.queryParamMap.subscribe((params) => {
       this.applicationId = params.get('applicantId') ?? '';
       this.jobIds = params.get('jobId') ?? '';
       this.applicantName = params.get('name') ?? '';
       this.applicantEmail = params.get('email') ?? '';
       
     })

    this.interviewFeedbackForm = this.fb.group({

      // ================= TR =================

      tr: this.fb.group({
        decision: ['', Validators.required],
        rating: [null],
        feedback: ['']
      }),

      // ================= MR =================

      mr: this.fb.group({
        decision: [''],
        rating: [null],
        feedback: ['']
      }),

      // ================= HR =================

      hr: this.fb.group({
        decision: [''],
        rating: [null],
        feedback: ['']
      })

    });

    this.setupSequentialWorkflow();


  }


  // =====================================================
  // SEQUENTIAL WORKFLOW
  // =====================================================

  private setupSequentialWorkflow(): void {

    const tr = this.interviewFeedbackForm.get('tr') as FormGroup;
    const mr = this.interviewFeedbackForm.get('mr') as FormGroup;
    const hr = this.interviewFeedbackForm.get('hr') as FormGroup;


    // Initially only TR is available

    mr.disable();
    hr.disable();


    // =====================================================
    // TR DECISION
    // =====================================================

    tr.get('decision')?.valueChanges.subscribe(
      (decision: string) => {

        // Clear previous MR/HR data

        mr.reset();
        hr.reset();


        if (decision === 'SELECT') {

          // TR selected candidate
          // Enable MR

          mr.enable();

          // HR still locked

          hr.disable();

        } else if (decision === 'REJECT') {

          // TR rejected candidate
          // MR and HR remain disabled

          mr.disable();
          hr.disable();

        } else {

          // No TR decision yet

          mr.disable();
          hr.disable();
        }

      }
    );


    // =====================================================
    // MR DECISION
    // =====================================================

    mr.get('decision')?.valueChanges.subscribe(
      (decision: string) => {

        // Clear HR whenever MR decision changes

        hr.reset();


        if (decision === 'SELECT') {

          // MR selected candidate
          // Enable HR

          hr.enable();

        } else if (decision === 'REJECT') {

          // MR rejected candidate
          // HR remains disabled

          hr.disable();

        } else {

          // No MR decision

          hr.disable();
        }

      }
    );

  }


  // =====================================================
  // SUBMIT
  // =====================================================

  submitFeedback(): void {

    if (this.interviewFeedbackForm.invalid) {

      this.interviewFeedbackForm.markAllAsTouched();

      return;
    }


    /*
     * getRawValue() is used because Angular does not
     * include disabled controls when using .value.
     */

    const feedback = this.interviewFeedbackForm.getRawValue();


    console.log('Interview Feedback:', feedback);


    /*
     * Example payload:
     *
     * {
     *   tr: {
     *     decision: "SELECT",
     *     rating: 4,
     *     feedback: "Good technical knowledge"
     *   },
     *
     *   mr: {
     *     decision: "SELECT",
     *     rating: 4,
     *     feedback: "Good leadership skills"
     *   },
     *
     *   hr: {
     *     decision: "SELECT",
     *     rating: 5,
     *     feedback: "Good cultural fit"
     *   }
     * }
     */


    // Call your Spring Boot API here
    //
    // this.interviewService.submitFeedback(feedback)
    //   .subscribe({
    //
    //     next: response => {
    //       console.log('Feedback saved', response);
    //     },
    //
    //     error: error => {
    //       console.error('Failed to save feedback', error);
    //     }
    //
    //   });

  }


  // =====================================================
  // CANCEL
  // =====================================================

  cancel(): void {

    this.interviewFeedbackForm.reset();


    // After reset, restore the initial state

    const mr = this.interviewFeedbackForm.get('mr');

    const hr = this.interviewFeedbackForm.get('hr');


    mr?.disable();
    hr?.disable();

  }

  saveTrFeedback(){

    let user : string | null = localStorage.getItem("username");
    let username ;
      if(user){
          const users : LoggedInUser =     JSON.parse(user); 
          username = users.username;           
      }
    const trfeedaback = this.interviewFeedbackForm.get('tr')?.value;
                        
    const interviewFeedback :Interviewfeedback = {
      applicantName : this.applicantName,
      applicationId : this.applicationId,
      jobId: this.jobIds,
      rating: trfeedaback?.get('rating')?.value,
      feedback: trfeedaback?.get('feedback')?.value,
      decision : trfeedaback?.get('decision')?.value,
      mrname : username ?? ''
    }; 

    this.restApi.submitInterviewFeedback(JSON.stringify(interviewFeedback) ,"tr").subscribe(
      (data) => {
       if(data && this.interviewFeedbackForm.get('tr')?.get('decision')?.value === 'SELECT'){
          console.log(data);
          this.interviewFeedbackForm.get("mr")?.enable();
          this.interviewFeedbackForm.get("hr")?.disable();

        }else if (data && this.interviewFeedbackForm.get('tr')?.get('decision')?.value === 'REJECT') {
          this.interviewFeedbackForm.get("mr")?.disable();
          this.interviewFeedbackForm.get("mr")?.disable();
        }
      },
      (error) => console.log(error),
      () => console.log("TR ffedback completed successfully")
    );
  }

  saveMrFeedback(){

    let user : string | null = localStorage.getItem("username");
    let username ;
      if(user){
          const users : LoggedInUser =     JSON.parse(user); 
          username = users.username;           
      }
    const mrfeedaback = this.interviewFeedbackForm.get('mr')?.value;
                        
    const interviewFeedback :Interviewfeedback = {
      applicantName : this.applicantName,
      applicationId : this.applicationId,
      jobId: this.jobIds,
      rating: mrfeedaback?.get('rating')?.value,
      feedback: mrfeedaback?.get('feedback')?.value,
      decision : mrfeedaback?.get('decision')?.value,
      mrname : username ?? ''
    }; 
    this.restApi.submitInterviewFeedback(JSON.stringify(interviewFeedback) ,"mr").subscribe({
      next : (data) => {
        if(data && this.interviewFeedbackForm.get('mr')?.get('decision')?.value == 'SELECT'){
          console.log(data);
          this.interviewFeedbackForm.get("hr")?.enable();
        }else if(this.interviewFeedbackForm.get('mr')?.get('decision')?.value == 'REJECT'){
            console.log(data);
          this.interviewFeedbackForm.get("mr")?.disable();
        }
        
      },
      error : (err)=> console.log(err),
      complete: ()=> console.log("complete")
    });
  }

  saveHrFeedback(){

    let user : string | null = localStorage.getItem("username");
    let username ;
      if(user){
          const users : LoggedInUser =     JSON.parse(user); 
          username = users.username;           
      }
    const hrfeedaback = this.interviewFeedbackForm.get('hr')?.value;
                        
    const interviewFeedback :Interviewfeedback = {
      applicantName : this.applicantName,
      applicationId : this.applicationId,
      jobId: this.jobIds,
      rating: hrfeedaback?.get('rating')?.value,
      feedback: hrfeedaback?.get('feedback')?.value,
      decision : hrfeedaback?.get('decision')?.value,
      mrname : username ?? ''
    }; 
    this.restApi.submitInterviewFeedback(JSON.stringify(interviewFeedback) ,"hr").subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => console.log("HR feedback completed successfully")
    );
    
  }

}



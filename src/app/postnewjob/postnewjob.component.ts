import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IntegrationService } from '../integration.service';
import { LoggedInUser } from '../logged-in-user';

@Component({
  selector: 'app-postnewjob',
  templateUrl: './postnewjob.component.html',
  styleUrls: ['./postnewjob.component.css']
})
export class PostnewjobComponent {

  constructor(private fb : FormBuilder,private apiService : IntegrationService){

  }

  jobPostForm = this.fb.group({

      jobId: ['', Validators.required],

      jobTitle: ['', Validators.required],

      companyName: ['', Validators.required],

      location: [''],

      employmentType: ['FULL_TIME'],

      experience: [''],

      salary: [''],

      skills: [''],

      jobDescription: [''],

      lastDate: [''],

      jobPostedBy : ['']

    });

    postJob(){

        let user : string | null = localStorage.getItem("username");
        if(user){
         const users : LoggedInUser =     JSON.parse(user);
         this.jobPostForm.patchValue({
          jobPostedBy : users.username
         });

         this.apiService.postnewJob(JSON.stringify(this.jobPostForm.value)).subscribe(
          (data) => console.log(data),
          (err) => console.log(err),
          () => console.log("successfully cretaed jobs")
        );

        }
        

    }

}


import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { SerachutilService } from '../serachutil.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Jobs } from '../jobs';

@Component({
  selector: 'app-latest-jobs',
  templateUrl: './latest-jobs.component.html',
  styleUrls: ['./latest-jobs.component.css']
})
export class LatestJobsComponent implements OnInit{

  jobs : Jobs[] = [];

  constructor(private fb : FormBuilder,private apiService: IntegrationService,private router : Router , 
      private searchapi : SerachutilService){
        
  }

  ngOnInit(): void {    
    this.latestJobs();
    this.searchForm.valueChanges.subscribe((values) => {
           let company =     values.company?.trim() || '';
           let technology =     values.company?.trim() || '';
           let experience =     values.company?.trim() || '';   
           const isSearchEmpty =  !company && !technology && !experience;
           if(isSearchEmpty){
            this.latestJobs();
           }else{
            this.searchJobs();
           }
         }
      )
  }

  searchForm = this.fb.group({
      company : ['',Validators.required],
      technology : ['',Validators.required],
      experience : ['',Validators.required]
  
  })


  searchJobs(){     
   let companies =  this.searchForm.get('company')?.value;
   let techs =  this.searchForm.get('technology')?.value;
   let experience =  this.searchForm.get('experience')?.value;
   this.searchapi.searchJobs(companies,techs,experience).subscribe((data) => {
       this.jobs = data;
   },
   (error) => console.log("Error while searching jobs"));
  }

  latestJobs(){
    this.apiService.fetchCurrentJobs().subscribe((data) => {
      this.jobs = data;
    })
  }

  viewCompany(companyName:string){
     this.router.navigate(['jobs',companyName]);
  }

  resetSearch(){
    
  }
}

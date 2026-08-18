import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IntegrationService } from '../integration.service';
import { Jobs } from '../jobs';
import { Router } from '@angular/router';
import { SerachutilService } from '../serachutil.service';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-joblistings',
  templateUrl: './joblistings.component.html',
  styleUrls: ['./joblistings.component.css']
})
export class JoblistingsComponent implements OnInit{
  
  jobs : Jobs[] = [];


  constructor(private fb : FormBuilder,private apiService: IntegrationService,private router : Router , 
    private searchapi : SerachutilService){
    
  }

  ngOnInit(): void {
     this.fetchLatestPostedJob();
     this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
     ).subscribe((values) => {
       let company =     values.company?.trim() || '';
       let technology =     values.company?.trim() || '';
       let experience =     values.company?.trim() || '';

       const isSearchEmpty =  !company && !technology && !experience;
       if(isSearchEmpty){
        this.fetchLatestPostedJob();
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

   this.searchapi.searchJobs(companies,techs,experience).subscribe(
      (data) => {this.jobs = data},
      (err) => console.error("Error while fetching jobs")
   )
    
  }

  // serachFunctionForUserAsHeTypes

  searchAsTypes(){
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
          const company = value.company?.trim() || '';
          const technology = value.technology?.trim() || '';
          const experience = value.experience?.trim() || '';
          const isSearchEmpty = !company && !technology && !experience;

        return isSearchEmpty
            ? this.fetchLatestPostedJobs()
            : this.searchapi.searchJobsss(value);
      })).subscribe(
        (data) => {this.jobs = data},
        (err) => console.error("Error while fetching jobs"));
    }

  fetchLatestPostedJob(){
     this.apiService.fetchLatestJobs().subscribe(
      (data) => {this.jobs = data},
      (err) => console.error("Error while fetching jobs")
    )

  }

  fetchLatestPostedJobs():Observable<Jobs[]>{
    return  this.apiService.fetchLatestJobs();

  }

  jobdetails(jobid:string){
    this.router.navigate(['/jobdetails',jobid]);
  }



}

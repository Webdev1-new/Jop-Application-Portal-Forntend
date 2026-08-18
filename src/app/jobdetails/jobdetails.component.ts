import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntegrationService } from '../integration.service';
import { Jobs } from '../jobs';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit{
 
  job : any;
  responsibility : any;
  requirement : any;
  skills : any;
  idd: string = "";

  constructor(private activatedRoute : ActivatedRoute,private apiService : IntegrationService){

  }

  ngOnInit(): void {   
    this.activatedRoute.paramMap.subscribe((params) => {
      let ids: any =   params.get("id");
      if(ids){
        console.log(ids);
        this.apiService.fetchSpecificJob(ids).subscribe((data) =>{
           this.job = data;
        },
      (err) => console.log(err));
      }
    })   
  }

  apply(jobId:string,jobTitle:string){
    this.apiService.apply(jobId,jobTitle).subscribe(
      (data) => {console.log(data)},
      (err)  => {console.log("successfully applied")}
      
    )
    
  }

}

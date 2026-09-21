import { Component, inject, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-jobapplicationstatus',
  templateUrl: './jobapplicationstatus.component.html',
  styleUrls: ['./jobapplicationstatus.component.css']
})
export class JobapplicationstatusComponent implements OnInit{

  jobapplicationdetails : any = [];

  authService : IntegrationService = inject(IntegrationService);

  ngOnInit():void {
     this.authService.fetchLatestJobs();
  }
}

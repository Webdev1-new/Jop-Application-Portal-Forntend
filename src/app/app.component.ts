import { Component, OnInit } from '@angular/core';
import { IntegrationService } from './integration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Jobportal';
  userLoggedIn = false;

  constructor(private restApi : IntegrationService){


  }


  ngOnInit(): void {  
    this.restApi.userLoggedIn.subscribe((data) => {
      console.log(data);
       this.userLoggedIn = data; 
    })
  }

  logout(){
    this.restApi.userLoggedIn.next(false);
    localStorage.clear();
  }
}

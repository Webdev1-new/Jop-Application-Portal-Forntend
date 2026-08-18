import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { IntegrationService } from '../integration.service';
import { Router } from '@angular/router';
import { LoggedInUser } from '../logged-in-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb : FormBuilder,private restApi : IntegrationService,private router : Router){

  }

  login = this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required]
  })

  signin(){
    this.restApi.signIn(JSON.stringify(this.login.value)).subscribe(
      (data:LoggedInUser) => {
        console.log(data);
        localStorage.setItem("username",JSON.stringify(data));
        this.restApi.userLoggedIn.next(true);
        if(data.role=='Employer'){
          this.router.navigate(['/employerdashboard']);
        }else{
          this.router.navigate(['/jobs']);
        }
        
      },
      (err) => console.log("Error while logging in user"),
      () => console.log("succcessfully logged in")
    )
  }

}

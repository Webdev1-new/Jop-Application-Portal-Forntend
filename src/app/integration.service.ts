import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { LoggedInUser } from './logged-in-user';
import { Jobs } from './jobs';
import { Applicants } from './applicants';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  private signinUrl : string = "http://localhost:8080/signin";
  private registrationUrl : string = "http://localhost:8080/register";
  private applicantRegistrationUrl : string = "http://localhost:8080/register/applicant"
  private postJobUrl : string = "http://localhost:8080/create/newJob";
  private getJobs : string = "http://localhost:8080/get/jobs";
  private getSpecificJob : string = "http://localhost:8080/get/jobss";
  private applyForSpecificJob : string = "http://localhost:8080/applyForSpecificJob";
  private fetchJobPosted : string = "http://localhost:8080/job/";
  private getJobApplicants : string = "http://localhost:8080/get/applicant/details";
  private scheduleCandidateInterview : string = "http://localhost:8080/schedule/interview";
  private  dashboardJobs : string = "http://localhost:8080/get/latest/jobs";

  userLoggedIn = new BehaviorSubject<any>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable;


  constructor(private http :HttpClient) { }

  signIn(signindetails : string): Observable<LoggedInUser>{
     const headers = {'content-type': 'application/json'};
    return this.http.post<LoggedInUser>(this.signinUrl,signindetails,{headers}).pipe(
      catchError( (err) =>  {
        console.error("Login falied for user");
        return throwError(() => new Error("Error while trying to login please try again"));
      })
    );
  }

  register(registrationdetails: string):Observable<String>{
    const headers = {'content-type': 'application/json'};
    return this.http.post<String>(this.registrationUrl,registrationdetails,{headers}).pipe(
      catchError( (err) =>  {
        console.error("Login falied for user");
        return throwError(() => new Error("Error while trying to register employer please try again"));
      })
    );
  }

  registerJobApplicant(registrationdetails: string) : Observable<String>{
    const headers = {'content-type': 'application/json'};
    return this.http.post<String>(this.applicantRegistrationUrl,registrationdetails,{headers}).pipe(
      catchError( (err) =>  {
        console.error("Login falied for user");
        return throwError(() => new Error("Error while trying to register employer please try again"));
      })
    );
  }


  postnewJob(jobdetails: string):Observable<String> {
    const headers = {'content-type': 'application/json'};
    return  this.http.post<String>(this.postJobUrl,jobdetails,{headers}).pipe(
      catchError( (err) =>  {
        console.error("Login falied for user");
        return throwError(() => new Error("Error while trying to register employer please try again"));
      })
    );;
  }

 fetchLatestJobs():Observable<Jobs[]>{
   return  this.http.get<Jobs[]>(this.getJobs).pipe(
    catchError((err) => {
         console.error("Errr while fetching jobs");
         return throwError(() => new Error("Error while fetching jobs"));
      })
    );
  }

  fetchSpecificJob(ids:string): Observable<Jobs>{

    let httpParams = new HttpParams();
    httpParams = httpParams.append('jobId',ids);

    return this.http.get<Jobs>(this.getSpecificJob,{params:httpParams}).pipe(
      catchError((err) => {
         console.error("Errr while fetching jobs");
         return throwError(() => new Error("Error while fetching jobs"));
      })
    );
    
  }

  apply(jobId:string,jobTitle:string): Observable<String> {

   const headers = {'content-type': 'application/json'};
   let user = localStorage.getItem("username");
   if(user){
    const applicant : LoggedInUser = JSON.parse(user);
    const data  = {jobId : jobId , username : applicant.username , jobTitle:jobTitle};
   return  this.http.post<String>(this.applyForSpecificJob,data,{headers}).pipe(
    catchError((err) => {
        console.error("Errr while applying jobs");
        return throwError(() => new Error("Error while applying jobs"));
      })
  )
  } else{
       return throwError(() => new Error("Error while applying jobs"));
   }

  }

  fetchJobPostings(username:string):Observable<Jobs[]>{

   return this.http.get<Jobs[]>(this.fetchJobPosted + username).pipe(
       catchError((err) => {
        console.error("Error while applying jobs");
        return throwError(() => new Error("Error while applying jobs"));
      })
    )
  }

  applicants(jobId:string):Observable<Applicants[]> {
    
    let httpParams = new HttpParams();
    httpParams = httpParams.append('jobId',jobId);    
    return this.http.get<Applicants[]>(this.getJobApplicants,{params:httpParams}).pipe(
      catchError((err) => {
        console.error("Error while applying jobs");
        return throwError(() => new Error("Error while applying jobs"));
      })
    )
  }

  submitInterviewDetails(interviewDetails: string):Observable<String>{
    const headers = {'content-type': 'application/json'};
    return this.http.post<String>(this.scheduleCandidateInterview,interviewDetails,{headers}).pipe(
      catchError((err) => {
        console.error("Error while applying jobs");
        return throwError(() => new Error("Error while applying jobs"));
      })
    )
  }

  fetchCurrentJobs(): Observable<Jobs[]>{
    return this.http.get<Jobs[]>(this.dashboardJobs).pipe(
    catchError((err) => {
         console.error("Errr while fetching jobs");
         return throwError(() => new Error("Error while fetching jobs"));
      })
    );
  }

  submitInterviewFeedback(feedback:string,feedbackby:string):Observable<String>{
    let httpParams = new HttpParams();
    httpParams  = httpParams.append("feedbackfrom",feedbackby);
    return this.http.post<string>(this.dashboardJobs,feedback,{params:httpParams}).pipe(
    catchError((err) => {
      console.error("Errr while fetching jobs");
      return throwError(() => new Error("Error while fetching jobs"));
      })
    );  
  }

  fetchJobApplicationDetails():Observable<any[]> {
       
      let httpParams =   new HttpParams() ;
      let username = localStorage.getItem("username");
      if(username){
         httpParams = httpParams.append("username",username);
         httpParams.append("username",username) ; 
      }      
      return this.http.get<any[]>( "http://localhost:8080/",{params:httpParams}).pipe(
        catchError((err) => {
          return throwError(() => new Error("Error while fetching jobs"));
        })
      );
       

  }

}

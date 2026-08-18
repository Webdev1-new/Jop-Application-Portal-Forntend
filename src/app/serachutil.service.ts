import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { Jobs } from './jobs';

@Injectable({
  providedIn: 'root'
})
export class SerachutilService {

  private searchApi = "http://localhost:8080/search/jobs";

  constructor(private http : HttpClient) { }

  searchJobs(company:any,technology:any,experience:any):Observable<Jobs[]>{
    let params = new HttpParams();
    if(company!=null && company!='')  {
      params = params.append('company',company);
    }
    if(technology!=null && technology!='')  {
      params = params.append('technology',technology);
    }
    if(experience!=null && experience!='')  {
      params = params.append('experience',experience);
    }
    return this.http.get<Jobs[]>(this.searchApi,{params}).pipe(
      map((jobs) => {
        if(jobs.length>5){
          jobs.length=5;
        }
        return jobs;
      }),
      catchError((err) => {
        return throwError(() => new Error("Error while applying jobs")); 
      })
    );
  }


  searchJobsss(searchParameter:any){
    let params = new HttpParams();
    if(searchParameter.company!=null && searchParameter.company!='')  {
      params = params.append('company',searchParameter.company);
    }
    if(searchParameter.technology!=null && searchParameter.technology!='')  {
      params = params.append('technology',searchParameter.technology);
    }
    if(searchParameter.experience!=null && searchParameter.experience!='')  {
      params = params.append('experience',searchParameter.experience);
    }
    return this.http.get<Jobs[]>(this.searchApi,{params}).pipe(
      map((jobs) => {
        if(jobs.length>5){
          jobs.length=5;
        }
        return jobs;
      }),
      catchError((err) => {
        return throwError(() => new Error("Error while applying jobs")); 
      })
    );
  }
}

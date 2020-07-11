import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { MatDialog, PageEvent, MatSort, MatPaginator } from '@angular/material';
import { JobApplyDialogComponent } from '../dialogs/job-apply-dialog/job-apply-dialog.component';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { JobViewDialogComponent } from '../shared/job-view-dialog/job-view-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.less']
})
export class JobSearchComponent implements OnInit {

@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

data: any = {};
jobID: any;
query: any;
result: any;
isOrganization = localStorage.getItem("Is_Organization");
isCandidate = localStorage.getItem("Is_Candidate");
showLoader: boolean = false;
noMatch: boolean = false;
userIsCandidate: boolean = false;
userIsOrganization: boolean = false;

pageEvent: PageEvent;


pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  paginatorLength: number;

  row$: any;

displayedRows$: Observable<[]>;
  totalRows$: Observable<number>;
  startIndex: number = 0;
  endIndex: number = 10;


  constructor(
    private quizservice: QuizService,
    public userService: UserService,
    private dialog: MatDialog,
    private router: Router

  ) {

    {
      this.userService.candidatehai.subscribe(value => {
        if(value === true)
          this.userIsCandidate = true
        // else  
        //   this.userIsCandidate = false;
      })
    }
    {
      this.userService.organizationhai.subscribe(value => {
        if(value === true)
          this.userIsOrganization = true
        // else
        //   this.userIsOrganization = false
      })
    }

   }

  ngOnInit() {
    this.getListing();
  }

  getListing(){
    this.showLoader = true;
    this.quizservice.getAllJobs()
    .subscribe((data) => {
      console.log(data);
      this.data = data;
      this.paginatorLength = this.data.count;
      this.showLoader = false;
      console.log(this.data, "My Data");  
    });
  }

  getJobData(){
    let params = {};
    params["search"] = this.query;
    console.log("My Data", this.data);
    
    this.quizservice.getSearchedJob(params)
    .subscribe((res) => {
      console.log(res);
      this.result = res;
      this.render(this.result);
    })
  }

  applyFilter(filterValue: string) {
    this.showLoader = true
    this.query = filterValue.trim().toLowerCase();
    if(filterValue === ''){
      this.noMatch = false;
      this.getListing();
    }
    else{
      this.getJobData();
    }
  }

  render(input){
    this.data = input;
    if(this.data.count === 0)
      this.noMatch = true;
    else 
      this.noMatch = false;
    this.showLoader = false;
  }

  clear(){
    this.query = "";
    this.noMatch = false;
    this.getListing();

  }

  onPageChanged(event) {
    console.log(event);
    let start = event.pageIndex
    let end = event.pageIndex + 1
    let size = event.pageSize
    if (event.pageIndex > event.previousPageIndex) {
      start = event.pageIndex
      end = event.pageIndex + 1
      if (event.pageIndex != 0) {
        this.startIndex = start * size
      }
      else {
        this.startIndex = 0
      }
      this.endIndex = end * size
    }
    else if (event.pageIndex == event.previousPageIndex){
      
      this.startIndex = 0;
      this.endIndex = 1*size
    }
    else{
      start = event.previousPageIndex - 1
      end = event.previousPageIndex - 1
      if (event.previousPageIndex != 0) {
        this.endIndex = start * size
      }
      else {
        this.endIndex = 0
      }
      this.startIndex = end * size
    }

    
    console.log(this.endIndex, this.startIndex);
    
  }

  onApplyClick(id) {
    localStorage.setItem('id', id);
    this.router.navigate(['/jobapply']);
  }

  onViewClick(res){
    let data = {
      Name: res.Name,
      id: res.id,
      job_title: res.job_title,
      Job_Descreption: res.Job_Descreption,
      Minimum_experience: res.Minimum_experience,
      prefered_city: res.prefered_city
    }
    let dialogRef = this.dialog.open(JobViewDialogComponent, {
      height: '350px',
      data: data
    });
  }

  onViewApplicant(id) {
    localStorage.setItem('id', id);
    this.router.navigate(['/applicant-list']);
  }

  
}

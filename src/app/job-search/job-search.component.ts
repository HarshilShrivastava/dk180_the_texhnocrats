import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { MatDialog } from '@angular/material';
import { JobApplyDialogComponent } from '../dialogs/job-apply-dialog/job-apply-dialog.component';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { JobViewDialogComponent } from '../shared/job-view-dialog/job-view-dialog.component';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.less']
})
export class JobSearchComponent implements OnInit {

data: any = {};
jobID: any;
query: any;
result: any;
isOrganization = localStorage.getItem("Is_Organization");
isCandidate = localStorage.getItem("Is_Candidate");
showLoader: boolean = false

  constructor(
    private quizservice: QuizService,
    public userService: UserService,
    private dialog: MatDialog,
    private router: Router

  ) { }

  ngOnInit() {
    this.getListing();
  }

  getListing(){
    this.showLoader = true;
    this.quizservice.getAllJobs()
    .subscribe((data) => {
      console.log(data);
      this.data = data;
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
      this.getListing();
    }
    else{
      this.getJobData();
    }
  }

  render(input){
    this.data = input;
    this.showLoader = false;
  }

  clear(){
    this.query = "";
    this.getListing();

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
      height: '400px',
      data: data
    });
  }

  onViewApplicant(id) {
    localStorage.setItem('id', id);
    this.router.navigate(['/applicant-list']);
  }

  
}

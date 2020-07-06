import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { JobViewDialogComponent } from 'src/app/shared/job-view-dialog/job-view-dialog.component';

@Component({
  selector: 'app-recommended-jobs',
  templateUrl: './recommended-jobs.component.html',
  styleUrls: ['./recommended-jobs.component.less']
})
export class RecommendedJobsComponent implements OnInit {

  data: any;
  isCandidate: boolean = false;
  showLoader: boolean = false


  constructor(
    private quizService: QuizService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getRecommendedJobs();
    if(localStorage.getItem("Is_Candidate"))
      this.isCandidate = true;
  }

  getRecommendedJobs(){
    this.showLoader = true;

    this.quizService.getRecommendedJobs().subscribe(data => {
      console.log(data);
      this.data = data;
      this.showLoader = false;
    });
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

  onSubmit(id) {
    localStorage.setItem('id', id);
    this.router.navigate(['/jobapply']);
  }

}

import { Component, OnInit } from "@angular/core";
import { QuizService } from "src/app/shared/quiz.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { JobViewDialogComponent } from 'src/app/shared/job-view-dialog/job-view-dialog.component';

@Component({
  selector: "app-job-listings",
  templateUrl: "./job-listings.component.html",
  styleUrls: ["./job-listings.component.less"],
})
export class JobListingsComponent implements OnInit {
  data: any = {};
  showLoader: boolean = false;
  isEmpty: boolean = false;
  notRegistered: boolean = false;

  constructor(
    private quizService: QuizService, 
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.showLoader = true;
    if (
      localStorage.getItem("Is_Organization") === "false" ||
      localStorage.getItem("Is_Organization") === undefined ||
      !localStorage.getItem("Is_Organization")
    )
      this.notRegistered = true;
    this.quizService.jobView().subscribe((data: any) => {
      console.log(data);
      this.data = data;
      this.showLoader = false;
      if (this.data.data.length === 0) this.isEmpty = true;
    });
  }

  onViewApplicant(id) {
    localStorage.setItem("job_id", id);
    this.router.navigate(["/applicant-list"]);
  }

  onViewClick(res){
    let data = {
      job_title: res.job_title,
      fields: res.fields,
      Minimum_experience: res.Minimum_experience,
      Job_Descreption: res.Job_Descreption,
      prefered_city: res.prefered_city,
    }
    let dialogRef = this.dialog.open(JobViewDialogComponent, {
      height: '350px',
      data: data
    });
  }
}

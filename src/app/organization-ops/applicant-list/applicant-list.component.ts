import { Component, OnInit } from "@angular/core";
import { QuizService } from "src/app/shared/quiz.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { JobViewDialogComponent } from 'src/app/shared/job-view-dialog/job-view-dialog.component';

@Component({
  selector: "app-applicant-list",
  templateUrl: "./applicant-list.component.html",
  styleUrls: ["./applicant-list.component.less"],
})
export class ApplicantListComponent implements OnInit {
  data: any = {};
  plagStat: any = {};

  showLoader: boolean = false;
  isEmpty: boolean = false;

  constructor(
    private quizservice: QuizService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.showLoader = true;
    this.getApplicants();
    this.checkPlag();
  }

  getApplicants() {
    this.quizservice.viewAppliedCandidateList().subscribe((data) => {
      console.log(data);
      this.data = data;
      this.showLoader = false;
      if(this.data.data.length === 0)
        this.isEmpty = true;
      console.log(this.data);
      if (this.data.data.length === 0) this.isEmpty = true;
    });
  }

  checkPlag() {
    this.quizservice.checkPlagiarism(this.data.proposal).subscribe((data) => {
      console.log(data);
      this.plagStat = data;
    });
  }

  onViewClick(res){
    let data = {
      Recruit_obj: res.Recruit_obj,
      Recruit_add_obj: res.Recruit_add_obj,
      proposal: res.proposal,
      similarity: res.similarity,
      plagPercent: res.plagPercent,
      At: res.At,
      candi_skills: res.get_candidate_skills,
      job_skills: res.get_job_skills
    }
    let dialogRef = this.dialog.open(JobViewDialogComponent, {
      height: '400px',
      data: data
    });
  }
}

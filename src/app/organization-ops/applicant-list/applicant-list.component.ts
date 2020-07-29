import { Component, OnInit } from "@angular/core";
import { QuizService } from "src/app/shared/quiz.service";
import { Router } from "@angular/router";

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

  constructor(private quizservice: QuizService, private router: Router) {}

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
}

import { Component, OnInit } from "@angular/core";
import { QuizService } from "src/app/shared/quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-jobs-applied",
  templateUrl: "./jobs-applied.component.html",
  styleUrls: ["./jobs-applied.component.less"],
})
export class JobsAppliedComponent implements OnInit {
  data: any = {};
  query: string;
  showLoader: boolean = false;
  noMatch: boolean = false;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.getListing();
  }

  getListing() {
    this.showLoader = true;
    this.quizService.getAppliedJobs().subscribe((data) => {
      console.log(data);
      this.data = data;
      this.showLoader = false;
      if (this.data.count === 0) this.noMatch = true;
      console.log(this.data);
    });
  }

  clear() {
    this.query = "";
  }
}

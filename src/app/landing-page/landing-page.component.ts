import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { QuizService } from "../shared/quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.less"],
})
export class LandingPageComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    public userService: UserService,
    public quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.quizService.chaluKar.next(false);
    this.quizService.showTimer.next(false);
  }

  onClick(inp) {
    if (inp === "quiz") this.router.navigate(["/instructions"]);
    else if (inp === "dashboard") this.router.navigate(["/canview"]);
    else if (inp === "jobs") this.router.navigate(["/job-search"]);
    else if (inp === "jobForm") this.router.navigate(["/jobForm"]);
  }
}

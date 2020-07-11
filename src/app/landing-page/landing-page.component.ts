import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    public userService: UserService,
    public quizService: QuizService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.quizService.chaluKar.next(false);
    this.quizService.showTimer.next(false);
  }

}

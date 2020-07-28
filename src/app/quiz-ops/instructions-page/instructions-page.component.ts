import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-instructions-page',
  templateUrl: './instructions-page.component.html',
  styleUrls: ['./instructions-page.component.less']
})
export class InstructionsPageComponent implements OnInit {

  continue: boolean = false;
  hide1: boolean = true;
hide:boolean=true;
labelPosition:false;
  constructor(
    private router: Router,
    public quizService: QuizService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.quizService.chaluKar.next(false);
    this.quizService.showTimer.next(false);
  }
  preview(){
    if(this.hide1)
      this.hide1 = false;
    else
      this.hide1= true;
  }

  preview1(){
    if(this.hide)
      this.hide = false;
    else
      this.hide= true;
  }
  onClick(){
    if(this.continue === false)
      this.continue = true
    else if(this.continue === true)
      this.continue = false
  }

  // proceed(){
  //   this.router.navigate(['/quiz'])
  // }
}

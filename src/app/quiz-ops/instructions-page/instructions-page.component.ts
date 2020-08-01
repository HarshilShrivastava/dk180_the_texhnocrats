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
  continue1: boolean = false;
  hide1: boolean = true;
hide:boolean=true;
disabled:false;
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
    if(this.hide1){
      this.hide1 = false;
      this.hide=true;}
    else   {
      this.hide1= true;
      this.hide=false;
    }

    // if(this.hide)
    // {
    //   this.hide=false;
    //   this.hide1=true;
    // }
    // else{
    //   this.hide=true;
    //   this.hide1=false;
    // }
    //   if(this.hide)
    //   this.hide = false;
    // else
    //   this.hide= true;
  }
  preview1(){
    if(this.hide){
      this.hide = false;
      this.hide1=true;}
    else{
      this.hide= true;
      this.hide1=false;
      
    }
  }
  onClick(){
    if(this.continue === false)
      this.continue = true
    else if(this.continue === true)
      this.continue = false
  }

  onClick1(){
    if(this.continue1 === false)
      this.continue1 = true
    else if(this.continue1 === true)
      this.continue1 = false
  }

  // proceed(){
  //   this.router.navigate(['/quiz'])
  // }
}

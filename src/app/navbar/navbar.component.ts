import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "../../../src/app/shared/user.model"
import { MatSidenav, MatDialog } from '@angular/material';
import { UserService } from '../shared/user.service';
import { QuizService } from '../shared/quiz.service';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { GeneralDialogBoxComponent } from '../dialogs/general-dialog-box/general-dialog-box.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  userIsCandidate: boolean;
  userIsOrganization: boolean;

  constructor(
    private router: Router,
    public user: User,
    public userService: UserService,
    public quizService: QuizService,
    private dialog: MatDialog
    ) { 
      this.quizService.onlySubDomainQuiz.subscribe(value => {
        if(value)
          this.timeLeft = 900;
        else if(!value)
          this.timeLeft = 1200;
      })


      this.quizService.chaluKar.subscribe(value => {
        this.quizStarted = value
        if(this.quizStarted === true)
          this.checkIfQuizStarted();
        else if(this.quizStarted === false)
          this.pauseTimer();
      })

      {
        this.quizService.showTimer.subscribe(value => {
          this.showTimer = value;
          if(this.showTimer === true){
            this.showLinks = false
          }
          if(this.showTimer === false){
            this.showLinks = true
            clearInterval(this.interval);
          }
        })
      }

      {
        this.userService.aaya.subscribe(value => {
          if(value === true)
          this.name = localStorage.getItem("cc_uname")
        })
      }
      {
        this.userService.candidatehai.subscribe(value => {
          if(value === true)
            this.userIsCandidate = true
          // else  
          //   this.userIsCandidate = false;
        })
      }
      {
        this.userService.organizationhai.subscribe(value => {
          if(value === true)
            this.userIsOrganization = true
          // else
          //   this.userIsOrganization = false
        })
      }
    }

  isLoggedIn:boolean;
  quizStarted: boolean = false;
  showTimer: boolean = false;
  showLinks: boolean = true;
  isOrganization = localStorage.getItem("Is_Organization");
  isCandidate = localStorage.getItem("Is_Candidate");
  tok = localStorage.getItem("token")

  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  timeLeft: number;
  interval;

  data: any;
  name: string = localStorage.getItem("cc_uname")


  ngOnInit() {
    this.checkIfQuizStarted();
    // this.getUserName();
  }

  getName(){
    this.userService.getUserName()
  }

  onClickOption(option){
    // if(this.quizStarted)
      // this.ifQuizOngoing(option);
    // else{
    if(option === 'home')
      this.router.navigate(['/home']);
    if(option === 'instructions')
      this.router.navigate(['/instructions']);
    if(option === 'course-list')
      this.router.navigate(['/course-list']);
    if(option === 'blog-list')
      this.router.navigate(['/blog-list']);
    if(option === 'scheme-list')
      this.router.navigate(['/scheme-list']);
    else if(option === 'create-job')
      this.router.navigate(['/jobForm']);
    else if(option === 'job-search')
      this.router.navigate(['/job-search']);
    else if(option === 'profiles')
      this.router.navigate(['/profiles']);
    else if(option === 'login')
      this.LogIn()
    else if(option === 'canview')
    this.router.navigate(['/canview']);
    else if(option === 'applied-jobs')
      this.router.navigate(['/applied-jobs']);
    else if(option === 'logout')
      this.Logout()
  // }
    
  }

  ifQuizOngoing(option){
    if(this.quizStarted === true){
      let dialogRef = this.dialog.open(GeneralDialogBoxComponent, {
        height: '170px',
        data: "All progress will be lost, continue?"
      });  
      dialogRef.afterClosed().subscribe((data) => {
        if (data === "proceed") {
          this.quizService.chaluKar.next(false);
          this.quizService.showTimer.next(false);
          if(option === 'logout')
            this.Logout();
          else
            this.router.navigate([option]);
          // this.timeLeft = 1200;
          clearInterval(this.interval);
        }
        // else
        //   this.router.navigate(['/instructions'])
      });
    } 
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  checkIfOrganization(){
    if(localStorage.getItem("Is_Organization") != null)
      return true;
    else
      return false;
  }

  checkIfCandidate(){
    if(localStorage.getItem("Is_Candidate") != null)
      return true;
    else
      return false;
  }

  checkifLoggedIn(){
  if(localStorage.getItem('token') != null){
    this.isLoggedIn=true;
    return true;
  }
  else 
  // this.router.navigate(["/login"])
    return false;
  }

  // getAppliedJobs(){
  //   this.router.navigate(['/applied-jobs'])
  // }

  // goToProfile(){
  //   if(this.isCandidate)
  //   {
  //     this.router.navigate(['/canview']);
  //   }
  //   else if(this.isOrganization)
  //   {
  //     this.router.navigate(['/orview']);
  //   }
  //   else
  //     alert("Unsuccessful!")
  // }

  checkIfQuizStarted(){
    if(this.quizStarted === true){
      this.startTimer();
    }
  }

  startTimer() {
    if(this.quizStarted){
      this.interval = setInterval(() => {
        if(this.timeLeft > 0 && this.quizStarted) {
          this.timeLeft--;
          if(this.timeLeft === 0){
            this.router.navigate(['/canview']);
            // this.router.navigate(['/home']);

            this.quizService.showTimer.next(false);
            let dialogRef = this.dialog.open(ErrorDialogComponent, {
              height: '170px',
              data: "Sorry your time is up!"
            });  
            
          }
        }
        else{
          this.quizService.chaluKar.next(false)
          // this.timeLeft = 1200;
          clearInterval(this.interval);
        }
      },1000)
      
    }
    // else{
    //   this.timeLeft = 1200;
    // }
  }

  pauseTimer(){
    clearInterval(this.interval);
  }

  SignOut() {
    this.router.navigate(['/register']);

  }

  

  LogIn(){
    this.router.navigate(['/login']);

  }

  Logout() {
    this.isLoggedIn = false;
    // localStorage.removeItem('token');
    // localStorage.removeItem('Is_University');
    // localStorage.removeItem('Is_Candidate');
    // localStorage.removeItem('Is_Organization');
    localStorage.clear();
    sessionStorage.clear();
    this.userIsCandidate = false;
    this.userIsOrganization = false;

    console.log('You Are Logged Out');
    this.router.navigate(['/login']);
  }
}

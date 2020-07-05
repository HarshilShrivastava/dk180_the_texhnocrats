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

  constructor(
    private router: Router,
    public user: User,
    public userService: UserService,
    public quizService: QuizService,
    private dialog: MatDialog
    ) { 
      this.quizService.chaluKar.subscribe(value => {
        this.quizStarted = value
        if(this.quizStarted === true)
        this.checkIfQuizStarted();
      })
    }

  isLoggedIn:boolean;
  quizStarted: boolean = false;
  isOrganization = localStorage.getItem("Is_Organization");
  isCandidate = localStorage.getItem("Is_Candidate");

  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  timeLeft: number = 1200;
  interval;


  ngOnInit() {
    this.checkIfQuizStarted();
  }

  onClickOption(option){
    if(this.quizStarted)
      this.ifQuizOngoing(option);
    else{
      if(option === 'home')
      this.router.navigate(['/home']);
    else if(option === 'create-job')
      this.router.navigate(['/create-job']);
    else if(option === 'job-search')
      this.router.navigate(['/job-search']);
    else if(option === 'profiles')
      this.router.navigate(['/profiles']);
    else if(option === 'login')
      this.router.navigate(['/login']);
    else if(option === 'applied-jobs')
      this.router.navigate(['/applied-jobs']);
    else if(option === 'logout')
      this.Logout()
    }
    
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
          if(option === 'logout')
            this.Logout();
          else
            this.router.navigate([option]);
          this.timeLeft = 1200;
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
            this.router.navigate(['/home']);
            let dialogRef = this.dialog.open(ErrorDialogComponent, {
              height: '170px',
              data: "Sorry your time is up!"
            });  
          }
        }
        else{
          this.quizService.chaluKar.next(false)
          this.timeLeft = 1200;
          clearInterval(this.interval);
        }
      },1000)
      
    }
    else{
      this.timeLeft = 1200;
    }
  }

  SignOut() {
    this.router.navigate(['/register']);

  }

  Logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('Is_University');
    localStorage.removeItem('Is_Candidate');
    localStorage.removeItem('Is_Organization');
    sessionStorage.clear();

    console.log('You Are Logged Out');
    this.router.navigate(['/login']);
  }
}

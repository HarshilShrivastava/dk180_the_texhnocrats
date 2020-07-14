import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-deactivate-profile',
  templateUrl: './deactivate-profile.component.html',
  styleUrls: ['./deactivate-profile.component.less']
})
export class DeactivateProfileComponent implements OnInit {

  constructor(
    private quizService: QuizService, 
    private router: Router,
    public userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  processForm(){
    this.quizService.deactivateProfile().subscribe((data: any) => {
      if(data.status === 200){
        let dialogRef = this.dialog.open(ErrorDialogComponent, {
          height: '200px',
          width: '400px',
          data: "Your profile has been deleted, redirecting you to home page..."
        });
        this.userService.logOut()
        setTimeout(() => {
          // localStorage.clear();
          this.router.navigate(['/home']);
          dialogRef.close(true);
        }, 1500);
      }
    })
  }

}

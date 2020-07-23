import { Component, OnInit } from '@angular/core';
import { Job } from '../shared/job.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { JobApply } from '../shared/jobapply.model';
import { GeneralDialogBoxComponent } from '../dialogs/general-dialog-box/general-dialog-box.component';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';


@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.less']
})


export class JobApplyComponent implements OnInit {
   apply: JobApply;
   constructor(
     private quizService: QuizService, 
     private router: Router,
     public dialog: MatDialog
    ) { }
   ngOnInit() {
     window.scroll(0, 0);
     this.resetForm();
   }
   resetForm(form?: NgForm) {
     if (form != null) {
       form.reset();
     }
     this.apply = {
       proposal: '',
     };
   }

   OnSubmit(form: NgForm) {
     this.quizService.jobapply(form.value).subscribe(
       (res: any) => {
         console.log(res);
         this.resetForm();
         let dialogRef = this.dialog.open(ErrorDialogComponent, {
           height: '150px',
           data: "Your application is on its way! :D"
         })
         this.router.navigate(['/job-search']);
       },
       err => {
         console.log(err.message);
       }
     );
   }
 }

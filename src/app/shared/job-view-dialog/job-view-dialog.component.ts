import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-job-view-dialog',
  templateUrl: './job-view-dialog.component.html',
  styleUrls: ['./job-view-dialog.component.less']
})
export class JobViewDialogComponent implements OnInit {

  isPresent: boolean = false;
  isCandidate: boolean = false;
  isApplicantList: boolean = false;
  isOrganization = localStorage.getItem("Is_Organization");

  constructor(
    public dialogRef: MatDialogRef<JobViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public userService: UserService

  ) { }

  ngOnInit() {
    if(this.data)
      this.isPresent = true;
    if(this.userService.isOrganization)
      this.isCandidate = false;
    if(this.data.At)
      this.isApplicantList = true;
    else  
      this.isApplicantList = false;
  }

  onApplyClick(){
    localStorage.setItem('id', this.data.id);
    this.dialogRef.close(true)
    this.router.navigate(['/jobapply']);
  }

}

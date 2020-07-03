import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-view-dialog',
  templateUrl: './job-view-dialog.component.html',
  styleUrls: ['./job-view-dialog.component.less']
})
export class JobViewDialogComponent implements OnInit {

  isPresent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<JobViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router

  ) { }

  ngOnInit() {
    if(this.data)
      this.isPresent = true;
  }

  onApplyClick(){
    localStorage.setItem('id', this.data.id);
    this.dialogRef.close(true)
    this.router.navigate(['/jobapply']);
  }

}

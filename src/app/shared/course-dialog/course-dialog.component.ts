import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.less']
})
export class CourseDialogComponent implements OnInit {

  isPresent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
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
    this.router.navigate(['/Apply']);
  }

}


import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.less']
})
export class BlogDialogComponent implements OnInit {

  isPresent: boolean = false;

  constructor(
    public dialogRef1: MatDialogRef<BlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router

  ) { }

  ngOnInit() {
    if(this.data)
      this.isPresent = true;
  }
   
  onApplyClick(){
    localStorage.setItem('id', this.data.id);
    this.dialogRef1.close(true)
    this.router.navigate(['/Apply']);
  }

}

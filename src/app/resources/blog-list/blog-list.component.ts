import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { UserService } from 'src/app/shared/user.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { BlogDialogComponent } from 'src/app/shared/blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.less']
})
export class BlogListComponent implements OnInit {

  @Input() public type: any;
  data: any = {};
  userIsCandidate: boolean = false;
  blog: boolean;
  course: boolean;
  scheme: boolean;
  userIsOrganization: boolean = false;
  query: string;
  showLoader: boolean;
  isEmpty: boolean;


  constructor(
    public quizService: QuizService,
    public userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
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

  ngOnInit() {
    this.showLoader = true;
    // this.getAllCourses();
    if(this.type === 'blog'){
      this.blog = true;
      this.quizService.getAllBlogs().subscribe((data) => {
        this.data = data;
        this.showLoader = false;
        if(this.data.count === 0)
          this.isEmpty = true
        console.log(this.data);
        
      })
    }
    else if(this.type === 'scheme'){
      this.scheme = true;
      this.quizService.getAllSchemes().subscribe((data) => {
        this.data = data;
        this.showLoader = false;
        if(this.data.count === 0)
          this.isEmpty = true
        console.log(this.data);
        
      })
    }
    else{
      this.course = true;
      this.quizService.getAllCourses().subscribe((data) => {
        this.data = data;
        this.showLoader = false;
        if(this.data.count === 0)
          this.isEmpty = true
        console.log(this.data);
      })
    }
  }

  onViewClick(res){
    let data = {
      Name: res.Title,
      id: res.id,
      By: res.By,
      Description: res.Description,
      Rating: res.Rating,
      Apply:res.Apply
    }
    let dialogRef = this.dialog.open(BlogDialogComponent, {
      height: '350px',
      data: data
    });

    
  }

  clear(){
    this.query = "";
  }


}

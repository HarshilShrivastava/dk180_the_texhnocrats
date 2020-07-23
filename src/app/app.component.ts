import { Component } from '@angular/core';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'CareerConnect';
  
  constructor(
    public userService: UserService,
    ){

  }

  ngOnInit(){
    if(this.userService.candidate === "true")
      this.userService.candidatehai.next(true)
      
    if(this.userService.organization === "true")
      this.userService.organizationhai.next(true)
  }
}

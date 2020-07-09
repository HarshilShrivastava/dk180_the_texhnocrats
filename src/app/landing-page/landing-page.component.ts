import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

}

import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-orview',
  templateUrl: './orview.component.html',
  styleUrls: ['./orview.component.less']
})
export class OrviewComponent implements OnInit {
  data: any = { 'data': [] };
  constructor( 
    private quizService : QuizService,
    public userService: UserService
    ) { }

  ngOnInit() {
    this.read();
  }
  read() {
    if (localStorage.getItem('Is_Organization') === 'true') {

    this.quizService.orView().subscribe(data => {
      console.log(data);
      this.data = data;
      localStorage.setItem("cc_uname", this.data.data.Name)
      this.userService.aaya.next(true)
    });
  }
  }
}

import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-org-pref',
  templateUrl: './org-pref.component.html',
  styleUrls: ['./org-pref.component.less']
})
export class OrgPrefComponent implements OnInit {
  data: { }

  constructor(
    public quizService: QuizService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    // this.quizService.getCustomQuiz().subscribe((data : any) => {
    //   this.data = data
    //   console.log(this.data);
      
    // })
  }

}

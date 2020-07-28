import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.less']
})
export class JobListingsComponent implements OnInit {

  data: any = {};

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.quizService.jobView().subscribe(
      (data: any) => {
        console.log(data);
        this.data = data;
      }
    )
    
  }

}

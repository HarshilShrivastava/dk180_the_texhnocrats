import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.less']
})
export class JobListingsComponent implements OnInit {

  data: any = {};
  showLoader: boolean = false;
  isEmpty: boolean = false;

  constructor(
    private quizService: QuizService,
    public router: Router
  ) { }

  ngOnInit() {
    this.showLoader = true;
    this.quizService.jobView().subscribe(
      (data: any) => {
        console.log(data);
        this.data = data;
        this.showLoader = false;
        if(this.data.data.length === 0)
          this.isEmpty = true;
      }
    )
    
  }

  onViewApplicant(id){
    localStorage.setItem("job_id", id)
    this.router.navigate(['/applicant-list'])
  }

}

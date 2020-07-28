import { Component, OnInit } from '@angular/core';
import { Job } from '../shared/job.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';


@Component({
  selector: 'app-jobform',
  templateUrl: './jobform.component.html',
  styleUrls: ['./jobform.component.less']
})
export class JobformComponent implements OnInit {
  job: Job;
  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.job = {
      job_title: '',
      Job_Descreption: '',
      Level: null,
      Minimum_experience: null,
      prefered_city: '',
      fields: null,
      // id: this.job.id
    };
  }

  OnSubmit(job_title, Job_Descreption, Level, Minimum_experience, prefered_city, fields) {
    this.quizService.jobview(
      job_title.value? job_title.value : "Not Added", 
      Job_Descreption.value? Job_Descreption.value : "Not Added", 
      Level.value? Level.value : null, 
      Minimum_experience.value? Minimum_experience.value: null , 
      prefered_city.value? prefered_city.value : "Not Added", 
      fields.value? fields.value: null
    ).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/job-listing']);
      },
      err => {
        console.log(err.message);
      }
    );
  }
}


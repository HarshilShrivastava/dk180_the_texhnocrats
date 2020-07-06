import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-candiview',
  templateUrl: './candiview.component.html',
  styleUrls: ['./candiview.component.less']
})
export class CandiviewComponent implements OnInit {
  data: any = {};
  resumeFile: any;
  resumeLink: any;

  constructor(
    private quizService: QuizService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.view();
    // this.handleFileInput();
  }

  view() {
    if (localStorage.getItem('Is_Candidate') === 'true') {
    this.quizService.canView().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }
  }

  handleFileInput() {
    // this.hide = false;
    this.quizService.canView().subscribe(data => {
      console.log(data);
      this.resumeFile = data
      // this.makeLink()
    });

    // Show image preview
    
    
  }

  makeLink(){
    const reader = new FileReader();

    reader.readAsDataURL(this.resumeFile.data.Resume);

    reader.onload = (event: any) => {
      this.resumeLink = event.target.result;
    };
  }

  resumeURL(){
    return this.sanitizer.bypassSecurityTrustUrl("https://harshraj.pythonanywhere.com{{data.data.Resume}})");
  }
 }

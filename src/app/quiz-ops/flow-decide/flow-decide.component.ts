import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/shared/quiz.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-flow-decide',
  templateUrl: './flow-decide.component.html',
  styleUrls: ['./flow-decide.component.less']
})
export class FlowDecideComponent implements OnInit {

  domains = new FormControl();

  domain: string = "unselected";

  domainList = {
    1: "Technology",
    2: "Marketing",
    3: "Social Sciences",
    4: "Finance",
  };

  constructor(
    private router: Router,
    private quizService : QuizService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    window.scrollTo(0,0)
  }

  onDomainSelectionChange(event) {
    this.domain = event.value.key;
    console.log(this.domain);
    // localStorage.setItem("Residence" , this.residence.toString())
  }

  onClick(txt){
    if(this.domain === "unselected" && txt !== 'notdecided'){
      let dialogRef = this.dialog.open(ErrorDialogComponent, {
        height: '150px',
        data: "Please select a domain first"
      })
    }

    this.quizService.onlySubDomainQuiz.next(true)

    if(txt === 'decided'){
      if(this.domain === "1")
      this.router.navigate(['/tech'])
    else if(this.domain === "2")
      this.router.navigate(['/mark'])
    else if(this.domain === "3" || this.domain === "4"){
      let dialogRef = this.dialog.open(ErrorDialogComponent, {
        height: '150px',
        data: "You have selected a dummy domain"
      })
    }
    
    }

    else if(txt === 'notdecided')
      this.router.navigate(['/quiz'])
    
  }

}

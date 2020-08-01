import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-quiz',
  templateUrl: './custom-quiz.component.html',
  styleUrls: ['./custom-quiz.component.less']
})
export class CustomQuizComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  data: any = {};
  quistionList: any;
  answerList: any;
  result_arr: any = [];
  totalAnswered = 0;
  questionThreshold: boolean = false;




  constructor(
    public quizService: QuizService,
    private _formBuilder: FormBuilder 
  ) { }

  ngOnInit() {
    this.quizService.getCustomQuiz().subscribe((data : any) => {
      this.data = data
      console.log(this.data); 

      this.data.Question_list.forEach(function(element) {
        element.active = false;
        element.noReview = true
      });
      this.data.Question_list.forEach(res =>{
        this.result_arr.push([])
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  Answer(Weightage, from_Domain, id, arr, index) {
    // this.result_arr.insert(index, arr);
    if(this.data.Question_list[index].active === false)
      this.totalAnswered += 1;
    this.data.Question_list[index].active = true;
    if(this.result_arr[index] === []){
      this.result_arr[index] = arr;
    }
    else{
      this.result_arr[index] = arr;
    }
    
    console.log(this.result_arr[index]);
    
    if(this.totalAnswered >= 10)
      this.questionThreshold = true;
  }

  markForReview(index){
    if(this.data.Question_list[index].noReview === false)
      this.data.Question_list[index].noReview = true
    else
      this.data.Question_list[index].noReview = false

  }

  Answers() {
    
    this.result_arr.forEach(res=>{
      if(res.Domain == 1){
        // this.techmarks += res.Weightage
        console.log(res.Domain);
        
      }
    })
    // this.quizService.Technical = this.techmarks;
    // console.log("Marks_tech_lvl1 = " + this.techmarks);
    // sessionStorage.setItem("Marks_tech_lvl1", JSON.stringify(this.techmarks))


    this.result_arr.forEach(res=>{
      if(res.Domain == 2){
        // this.marketmarks += res.Weightage
        console.log(res.Domain);
      }
    })
    // this.quizService.Marketing = this.marketmarks;
    // console.log("Marketing = " + this.marketmarks);
    // sessionStorage.setItem("Marks_marketing_lvl1", JSON.stringify(this.marketmarks))


    // this.totalmarks = this.techmarks + this.marketmarks;
    // this.quizService.Totalmarks = this.totalmarks
    // console.log("Total marks: " + this.totalmarks);
    

    // this.quizService.getResult().subscribe(
    //   res => {
    //     console.log(res);
    //     if (this.quizService.Marketing > this.quizService.Technical) {
    //       this.router.navigate(['/mark']);
    //     } else {
    //       this.router.navigate(['/tech']);
    //     }
    //   },
    //   err => {
    //     console.log(err.message);
    //     let dialogRef = this.dialog.open(ErrorDialogComponent, {
    //       height: '150px',
    //       data: err.message
          
    //     });     
    //   }
    // );
  }

}

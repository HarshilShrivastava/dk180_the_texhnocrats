import { Component, OnInit, HostListener } from "@angular/core";
import { QuizService } from "../shared/quiz.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { GeneralDialogBoxComponent } from "../dialogs/general-dialog-box/general-dialog-box.component";
import { map, first } from "rxjs/operators";
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Component({
  selector: "app-marketing",
  templateUrl: "./marketing.component.html",
  styleUrls: ["./marketing.component.less"],
})
export class MarketingComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  data: any = {};
  tech = 0;
  mark = 0;
  marks = 0;
  result_arr: any = [];
  marketmarks = 0;
  totalmarks = 0;
  rating = 0;

  sd_9 = {
    //Market research and analysis
    id: 0,
    weightage: 0,
    qid: 0,
  };
  sd_10 = {
    //Public Relations
    id: 0,
    weightage: 0,
    qid: 0,
  };
  sd_11 = {
    //Advertising
    id: 0,
    weightage: 0,
    qid: 0,
  };

  sd_13 = {
    //Digital Marketing
    id: 0,
    weightage: 0,
    qid: 0,
  };
  sd_marks_arr = new Array();
  ascending_sd_marks = new Array();

  max_sd: any;
  max2_sd: any;
  max_sd_id: any;
  max2_sd_id: any;
  max3_sd: any;
  max3_sd_id: any;
  max4_sd: any;
  max4_sd_id: any;
  temp = 0;
  hold: any;
  totalAnswered = 0;
  showLoader: boolean = false;
  proceed: boolean = false;
  questionThreshold: boolean = false;
  titleText: string;


  constructor(
    private quizService: QuizService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

    this.quizService.onlySubDomainQuiz.subscribe((value)=> {
      if(value)
        this.titleText = "Round 1: Quiz Domain Quiz"
      else if(!value)
        this.titleText = "Round 2: Domain Quiz"
    })
  }

  ngOnInit() {
    this.quizService.showTimer.next(true);
    this.quizService.chaluKar.next(false);
    this.quizService.startTimer = true;


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });

    this.MarkContacts();
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm(
      "You will lose your progress and be redirected to homepage"
    );
    if (result) {
      this.router.navigate(["/home"]);
      // Do more processing...
    }
    event.returnValue = false;
    // stay on same page
  }

  MarkContacts() {
    this.showLoader = true;
    this.quizService.MarkData().then((data) => {
      console.log(data);
      this.data = data;
      this.showLoader = false;

      this.quizService.chaluKar.next(true);

      this.data.data.forEach(function (element) {
        element.active = false;
        element.noReview = true;
      });
    })
    .catch((err) => {
      this.quizService.showTimer.next(false);
      this.quizService.startTimer = false;
      this.router.navigate(['/home'])
      console.log(err);
      let dialogRef = this.dialog.open(ErrorDialogComponent, {
        height: '180px',
        width: '360px',
        data: 'Sorry something went wrong. Please try again in sometime...'
      })
      
    })
  }

  canDeactivate() {
    // if the editName !== this.user.name
    if (this.proceed === false) {
      if (this.quizService.startTimer === true) {
        return this.openDialog();
      }
    }

    return true;
  }

  openDialog() {
    if (this.proceed === false) {
      let dialogRef = this.dialog.open(GeneralDialogBoxComponent, {
        height: "190px",
        width: "380px",
        data:
          "All progress will be lost and you will be redirected to home, continue?",
      });
      return dialogRef.afterClosed().pipe(
        map((result) => {
          if (result === "proceed") {
            this.router.navigate(["/home"]);
            this.quizService.chaluKar.next(false);
            this.quizService.showTimer.next(false);
            this.quizService.startTimer = false;
            return true;
          } else {
            return false;
          }
        }),
        first()
      );
    } else {
      this.proceed = true;
      return false;
    }
  }

  Answer(Weightage, from_Domain, id, arr, index) {
    // this.result_arr.insert(index, arr);
    if (this.data.data[index].active === false) this.totalAnswered += 1;
    this.data.data[index].active = true;

    if (this.result_arr[index] == []) {
      this.result_arr[index] = arr;
    } else {
      this.result_arr[index] = arr;
    }
    console.log(this.result_arr);
    console.log(this.result_arr[index].SubDomain);

    if (
      this.result_arr[index].SubDomain === 9 &&
      this.result_arr[index].id !== this.sd_9.qid
    ) {
      this.sd_9.weightage += this.result_arr[index].Weightage;
      this.sd_9.id = this.result_arr[index].SubDomain;
      this.sd_9.qid = this.result_arr[index].id;
    }
    console.log(this.sd_9);

    if (
      this.result_arr[index].SubDomain === 10 &&
      this.result_arr[index].id !== this.sd_10.qid
    ) {
      this.sd_10.weightage += this.result_arr[index].Weightage;
      this.sd_10.id = this.result_arr[index].SubDomain;
      this.sd_10.qid = this.result_arr[index].id;
    }
    console.log(this.sd_10);

    if (
      this.result_arr[index].SubDomain === 11 &&
      this.result_arr[index].id !== this.sd_11.qid
    ) {
      this.sd_11.weightage += this.result_arr[index].Weightage;
      this.sd_11.id = this.result_arr[index].SubDomain;
      this.sd_11.qid = this.result_arr[index].id;
    }
    console.log(this.sd_11);

    if (
      this.result_arr[index].SubDomain === 13 &&
      this.result_arr[index].id !== this.sd_13.qid
    ) {
      this.sd_13.weightage += this.result_arr[index].Weightage;
      this.sd_13.id = this.result_arr[index].SubDomain;
      this.sd_13.qid = this.result_arr[index].id;
    }
    console.log(this.sd_13);

    if(this.totalAnswered >= 10)
      this.questionThreshold = true;

    // console.log('Marks =' , Weightage );
    // // console.log(qID);
    // if (Domain === 1) {
    //     this.tech = this.tech + Weightage;
    //     this.quizService.Technical = this.tech;
    //     console.log(this.quizService.Technical, 'tech' , Weightage);
    //   } else {
    //     this.mark = this.mark + Weightage;
    //     this.quizService.Marketing = this.mark;
    //     console.log(this.quizService.Marketing, 'marketing' , Weightage);
    //   }
    // this.marks = this.marks + Weightage ;
    // this.quizService.Totalmarks = this.marks;
    // console.log(this.quizService.Totalmarks, 'marks' , Weightage);
  }

  markForReview(index) {
    if (this.data.data[index].noReview === false)
      this.data.data[index].noReview = true;
    else this.data.data[index].noReview = false;
  }

  getTopSubdomains() {
    this.sd_marks_arr.push(this.sd_9, this.sd_10, this.sd_11, this.sd_13);
    console.log("SD Array" + this.sd_marks_arr);

    this.max_sd = this.sd_marks_arr[0].weightage;
    this.max_sd_id = this.sd_marks_arr[0].id;
    this.max2_sd = this.sd_marks_arr[1].weightage;
    this.max2_sd_id = this.sd_marks_arr[1].id;

    if (this.max_sd < this.max2_sd) {
      this.temp = this.max_sd;
      this.max_sd = this.max2_sd;
      this.max_sd_id = this.max2_sd_id;
      this.max2_sd = this.temp;
      this.max2_sd_id = this.max_sd_id;
    }

    for (let i = 2; i < this.sd_marks_arr.length; i++) {
      if (this.sd_marks_arr[i].weightage > this.max_sd) {
        this.max2_sd = this.max_sd;
        this.max2_sd_id = this.max_sd_id;

        this.max_sd = this.sd_marks_arr[i].weightage;
        this.max_sd_id = this.sd_marks_arr[i].id;

        // this.hold = i;
      } else if (
        this.sd_marks_arr[i].weightage > this.max2_sd &&
        this.sd_marks_arr[i].weightage != this.max_sd
      ) {
        this.max2_sd = this.sd_marks_arr[i].weightage;
        this.max2_sd_id = this.sd_marks_arr[i].id;
        // if(i = 2)
        // console.log("Sub-domain 2nd maximumest is 2");
        // if(i = 3)
        // console.log("Sub-domain 2nd maximumest is 3");
        // if(i = 5)
        // console.log("Sub-domain 2nd maximumest is 5");
        // if(i = 7)
        // console.log("Sub-domain 2nd maximumest is 7");
      }

      // while(i === this.sd_marks_arr.length){
      //   console.log("Sub domain maximumest is" + this.hold);

      // if(i = 2)
      // console.log("Sub-domain maximumest is 2");
      // if(i = 3)
      // console.log("Sub-domain maximumest is 3");
      // if(i = 5)
      // console.log("Sub-domain maximumest is 5");
      // if(i = 7)
      // console.log("Sub-domain maximumest is 7");
      // }
    }

    console.log(
      "Sub domain no. 1 = " +
        this.max_sd +
        " from sub domain no. " +
        this.max_sd_id
    );
    sessionStorage.setItem("SD_1", JSON.stringify(this.max_sd_id));
    sessionStorage.setItem("SD_2", JSON.stringify(this.max2_sd_id));
    sessionStorage.setItem("SD1_marks", JSON.stringify(this.max_sd));
    sessionStorage.setItem("SD2_marks", JSON.stringify(this.max2_sd));

    console.log(
      "Sub domain no. 2 = " +
        this.max2_sd +
        " from sub domain no. " +
        this.max2_sd_id
    );

    this.setName();
  }

  sortDomains() {
    this.sd_marks_arr.push(this.sd_9, this.sd_10, this.sd_11, this.sd_13);

    this.ascending_sd_marks = this.sd_marks_arr.sort(function (obj1, obj2) {
      return obj1.weightage - obj2.weightage;
    });
    console.log(this.ascending_sd_marks);

    this.max_sd = this.ascending_sd_marks[3].weightage;
    this.max_sd_id = this.ascending_sd_marks[3].id;
    sessionStorage.setItem("SD_1", JSON.stringify(this.max_sd_id));
    sessionStorage.setItem("SD1_marks", JSON.stringify(this.max_sd));

    this.max2_sd = this.ascending_sd_marks[2].weightage;
    this.max2_sd_id = this.ascending_sd_marks[2].id;
    sessionStorage.setItem("SD_2", JSON.stringify(this.max2_sd_id));
    sessionStorage.setItem("SD2_marks", JSON.stringify(this.max2_sd));

    this.max3_sd = this.ascending_sd_marks[1].weightage;
    this.max3_sd_id = this.ascending_sd_marks[1].id;
    sessionStorage.setItem("SD_3", JSON.stringify(this.max3_sd_id));

    this.max4_sd = this.ascending_sd_marks[0].weightage;
    this.max4_sd_id = this.ascending_sd_marks[0].id;
    sessionStorage.setItem("SD_4", JSON.stringify(this.max4_sd_id));

    console.log(
      "Sub domain no. 1 = " +
        this.max_sd +
        " from sub domain no. " +
        this.max_sd_id
    );

    console.log(
      "Sub domain no. 2 = " +
        this.max2_sd +
        " from sub domain no. " +
        this.max2_sd_id
    );

    console.log(
      "Sub domain no. 3 = " +
        this.max3_sd +
        " from sub domain no. " +
        this.max3_sd_id
    );

    console.log(
      "Sub domain no. 4 = " +
        this.max4_sd +
        " from sub domain no. " +
        this.max4_sd_id
    );

    this.setName();
  }

  setName() {
    if (this.max_sd_id === 9)
      sessionStorage.setItem("SD1_name", "Market Research & Analysis");
    else if (this.max_sd_id === 10)
      sessionStorage.setItem("SD1_name", "Public Relations");
    else if (this.max_sd_id === 11)
      sessionStorage.setItem("SD1_name", "Advertising");
    else if (this.max_sd_id === 13)
      sessionStorage.setItem("SD1_name", "Digital Marketing");

    if (this.max2_sd_id === 9)
      sessionStorage.setItem("SD2_name", "Market Research & Analysis");
    else if (this.max2_sd_id === 10)
      sessionStorage.setItem("SD2_name", "Public Relations");
    else if (this.max2_sd_id === 11)
      sessionStorage.setItem("SD2_name", "Advertising");
    else if (this.max2_sd_id === 13)
      sessionStorage.setItem("SD2_name", "Digital Marketing");
  }

  Answers() {
    this.proceed = true;

    // this.getTopSubdomains();
    this.sortDomains();

    this.toRoundThree();

    this.result_arr.forEach((res) => {
      if (res.from_Domain == 2) {
        this.marketmarks += res.Weightage;
      }
    });

    this.quizService.Marketing = this.marketmarks;
    // console.log("Marks_marketing_lvl2" + this.marketmarks);
    sessionStorage.setItem(
      "Marks_marketing_lvl2",
      JSON.stringify(this.marketmarks)
    );

    this.totalmarks = this.marketmarks;
    console.log("Total marks: " + this.totalmarks);

    // let x = JSON.parse(sessionStorage.getItem("Marks_marketing_lvl1"));
    // let y = parseInt(x);
    // let g = JSON.parse(sessionStorage.getItem("Marks_marketing_lvl2"));
    // let z = parseInt(g);
    // this.rating = (y + z) / 15;
    // console.log("Marketing Rating: " + this.rating);

    this.quizService.Totalmarks = this.totalmarks;

    // this.router.navigate(['/quiz-results']);

    // this.quizService.markResult().subscribe(
    //   res => {
    //     console.log(res);
    //     if (this.quizService.Totalmarks > 3) {
    //       this.router.navigate(['/level2']);
    //     } else {
    //       this.router.navigate(['/level1']);
    //     }
    //   },
    //   err => {
    //     console.log(err.message);
    //   }
    // );
  }

  toRoundThree() {
    // this.quizService.getSubDomainQuestions().subscribe(data => {
    //   console.log(data);
    // });

    this.router.navigate(["/round-three"]);
  }
}

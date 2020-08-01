import { Component, OnInit } from "@angular/core";
import * as Papa from "papaparse";
import { QuizService } from 'src/app/shared/quiz.service';

declare var $: any;

@Component({
  selector: "app-upload-qa-customquiz",
  templateUrl: "./upload-qa-customquiz.component.html",
  styleUrls: ["./upload-qa-customquiz.component.less"],
})
export class UploadQaCustomquizComponent implements OnInit {
  dataList: any[];
  answer: string;
  domain: string;

  constructor(
    public quizService: QuizService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    $(".dropify").dropify({});
  }

  onFileChange(files: File[]) {
    console.log(event);
    if (files[0]) {
      console.log(files[0]);
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          console.log(result);
          this.dataList = result.data;
          this.valueOut();
        },
      });
    }
  }

  valueOut() {
    this.dataList.forEach( (data) => {
        // console.log(data[0], data[1].length);
        const id = data.id
        const question = data.Question_text;
        const domain = data.Domain;
        this.quizService.postQuestions(id, question, domain);
    }
      
    );
  }
}

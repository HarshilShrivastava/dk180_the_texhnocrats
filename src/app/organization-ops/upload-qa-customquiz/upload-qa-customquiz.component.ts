import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-qa-customquiz',
  templateUrl: './upload-qa-customquiz.component.html',
  styleUrls: ['./upload-qa-customquiz.component.less']
})
export class UploadQaCustomquizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFileChange(event){
    console.log(event);
  }

}

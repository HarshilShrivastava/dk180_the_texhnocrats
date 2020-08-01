import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-upload-qa-customquiz',
  templateUrl: './upload-qa-customquiz.component.html',
  styleUrls: ['./upload-qa-customquiz.component.less']
})
export class UploadQaCustomquizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(".dropify").dropify({});
  }

  onFileChange(event){
    console.log(event);
  }

}

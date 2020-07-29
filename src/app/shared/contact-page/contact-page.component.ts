import { Component, OnInit } from '@angular/core';
import { Fields } from "../signup-fields.model";
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.less']
})
export class ContactPageComponent implements OnInit {
  fields: Fields; 
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  processForm(){
    console.log("Form processed :D");
    
  }

}

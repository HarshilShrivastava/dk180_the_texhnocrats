import { Component, OnInit , Input} from '@angular/core';
import { Contactfields } from "../contact-fields.model";
import { from } from 'rxjs';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.less']
})
export class ContactPageComponent implements OnInit {
  @Input() public mode: any;

  messages: Contactfields;
  userNamePattern = "^[a-z0-9_]*$";
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  processForm(){
    console.log("Form processed :D");
    
  }

}

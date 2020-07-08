import { Component, OnInit } from '@angular/core';
import { QuizService} from '../shared/quiz.service';
import { HttpClient } from '@angular/common/http';
import { Routes, Router } from '@angular/router';
import { MatDialog, MatError } from '@angular/material';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { 
  SafeResourceUrl, 
  DomSanitizer } from '@angular/platform-browser';
import { GeneralDialogBoxComponent } from '../dialogs/general-dialog-box/general-dialog-box.component';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-createview',
  templateUrl: './createview.component.html',
  styleUrls: ['./createview.component.less']
})
export class CreateviewComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  imageUrl: string = 'http://localhost:4200/assets/image/default-image.png';
  fileToUpload: File = null;
  hide: boolean = true;
  socialMediaArray: Array<string> = [ ];

  residence: number;

  socialmedias = new FormControl();

  residences = new FormControl();

  platformList = {
    1:'Facebook', 
    2:'Twitter', 
    3:'Instagram', 
    4:'LinkedIn',
    9:'Snapchat', 
  };

  residenceList = {
    1: "Metro",
    2: "Urban",
    3: "Semi-Urban",
    4: "Rural"
  }

  constructor(
    private quizService: QuizService, 
    private http: HttpClient , 
    private router: Router,
    private dialog: MatDialog,
    private sanitization: DomSanitizer) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    // this.hide = false;
    this.fileToUpload = file.item(0);

    // Show image preview
    const reader = new FileReader();

    reader.readAsDataURL(this.fileToUpload);

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    
  }

  preview(){
    if(this.hide)
      this.hide = false;
    else
      this.hide = true;
  }

  onSelectionChange(event){
    console.log(event);
    this.socialMediaArray = [ ];
    event.value.forEach(res => {
      if(!this.socialMediaArray.includes(res.key))
        this.socialMediaArray.push(res.key)
        console.log(this.socialMediaArray);
    });
  }

  onResidenceSelectionChange(event){
    this.residence = event.value.key;
    console.log(this.residence);
    // localStorage.setItem("Residence" , this.residence.toString())
  }

  setPlatforms(){
    if(this.socialMediaArray[0] !== undefined)
      localStorage.setItem("SM1", this.socialMediaArray[0])
    if(this.socialMediaArray[1] !== undefined)
      localStorage.setItem("SM2", this.socialMediaArray[1])
    if(this.socialMediaArray[2] !== undefined)
      localStorage.setItem("SM3", this.socialMediaArray[2])
    if(this.socialMediaArray[3] !== undefined)
      localStorage.setItem("SM4", this.socialMediaArray[3])
    if(this.socialMediaArray[4] !== undefined)
      localStorage.setItem("SM5", this.socialMediaArray[4])
    
  }

  cleanUp(){
    localStorage.removeItem("SM1");
    localStorage.removeItem("SM2");
    localStorage.removeItem("SM3");
    localStorage.removeItem("SM4");
    localStorage.removeItem("SM5");
  }

  OnSubmit(Name, Address, Image, Time, income) {

    this.setPlatforms();
   if (localStorage.getItem('token')) {
   this.quizService.postFile(Name.value, Address.value, this.fileToUpload, Time.value, income.value, this.residence).subscribe(
     (data: any) => {
       console.log('done', data);
       if(data.status === 200){
       let dialogRef = this.dialog.open(GeneralDialogBoxComponent, {
        height: '200px',
        width: '400px',
        data: "Your profile is created successfully, would you like to proceed to the quiz?"
      });  
      dialogRef.afterClosed().subscribe((data) => {
        if (data === "proceed") {
          this.router.navigate(['/instructions']);
        }
        else
          this.router.navigate(['/canview'])
      });
       Name.value = null;
       Address.value = null;
       Image.value = null;
       this.imageUrl = 'https://p7.hiclipart.com/preview/919/5/279/computer-icons-font-awesome-text-file-document-txt-file.jpg';
       this.cleanUp();
     }
     else{
      let dialogRef = this.dialog.open(GeneralDialogBoxComponent, {
        height: '200px',
        width: '400px',
        data: "Sorry we could not create your account right now :( Please try again in sometime."
      }); 
      Name.value = null;
      Address.value = null;
      Image.value = null;
      this.imageUrl = 'https://p7.hiclipart.com/preview/919/5/279/computer-icons-font-awesome-text-file-document-txt-file.jpg';
      this.cleanUp();
     }
    
    }
   );
  } else{
    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      height: '200px',
      width: '400px',
      data: "Sorry your profile could not be created right now, please try again in some time."
    }); 
    Name.value = null;
    Address.value = null;
    Image.value = null;
    this.imageUrl = 'https://p7.hiclipart.com/preview/919/5/279/computer-icons-font-awesome-text-file-document-txt-file.jpg';
    this.router.navigate(['/signup']);
  }
  }

}

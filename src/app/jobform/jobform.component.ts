import { Component, OnInit } from "@angular/core";
import { Job } from "../shared/job.model";
import { NgForm, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { QuizService } from "../shared/quiz.service";
import { parse } from "querystring";

@Component({
  selector: "app-jobform",
  templateUrl: "./jobform.component.html",
  styleUrls: ["./jobform.component.less"],
})
export class JobformComponent implements OnInit {
  job: Job;

  domains = new FormControl();
  techsubdomains = new FormControl();
  marksubdomains = new FormControl();

  finalSubDomain: string;
  finalTechSubdomain: string;
  finalMarkSubdomain: string;

  domain: string;
  fields: number;

  domainIsTech: boolean = false;
  domainIsMark: boolean = false;

  techSubDomainArray: Array<string> = [];
  markSubDomainArray: Array<string> = [];

  domainList = {
    1: "Technology",
    2: "Marketing",
  };

  techSubDomainsList = {
    2: "Web Development",
    3: "Android App Development",
    5: "Software Development",
    7: "Data Scince",
  };

  markSubDomainsList = {
    9: "Marketing Research & Analytics",
    10: "Public Relations",
    11: "Advertising",
    13: "Digital Marketing",
  };

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.job = {
      job_title: "",
      Job_Descreption: "",
      Level: null,
      Minimum_experience: null,
      prefered_city: "",
      fields: null,
      SubDomain: "",
      // id: this.job.id
    };
  }

  onDomainSelectionChange(event) {
    this.domain = event.value.key;
    console.log(this.domain);
    if (this.domain === "1") {
      this.domainIsTech = true;
      this.domainIsMark = false;
      this.fields = 1;
    } else if (this.domain === "2") {
      this.domainIsMark = true;
      this.domainIsTech = false;
      this.fields = 2;
    }
    // localStorage.setItem("Residence" , this.residence.toString())
  }

  onTechSelectionChange(event) {
    console.log(event);

    this.finalTechSubdomain = event.value.key;
    // console.log(event);
    // this.techSubDomainArray = [];
    // event.value.forEach((res) => {
    //   if (!this.techSubDomainArray.includes(res.key))
    //     this.techSubDomainArray.push(res.key);
    //   console.log(this.techSubDomainArray);
    // });
  }

  onMarkSelectionChange(event) {
    console.log(event);

    this.finalMarkSubdomain = event.value.key;
    // console.log(event);
    // this.markSubDomainArray = [];
    // event.value.forEach((res) => {
    //   if (!this.markSubDomainArray.includes(res.key))
    //     this.markSubDomainArray.push(res.key);
    //   console.log(this.markSubDomainArray);
    // });
  }

  setTechSubdomains() {
    if (this.techSubDomainArray[0] !== undefined)
      localStorage.setItem("job_SD1", this.techSubDomainArray[0]);
    if (this.techSubDomainArray[1] !== undefined)
      localStorage.setItem("job_SD2", this.techSubDomainArray[1]);
    if (this.techSubDomainArray[2] !== undefined)
      localStorage.setItem("job_SD3", this.techSubDomainArray[2]);
    if (this.techSubDomainArray[3] !== undefined)
      localStorage.setItem("job_SD4", this.techSubDomainArray[3]);
  }

  setMarkSubdomains() {
    if (this.markSubDomainArray[0] !== undefined)
      localStorage.setItem("job_SD1", this.markSubDomainArray[0]);
    if (this.markSubDomainArray[1] !== undefined)
      localStorage.setItem("job_SD2", this.markSubDomainArray[1]);
    if (this.markSubDomainArray[2] !== undefined)
      localStorage.setItem("job_SD3", this.markSubDomainArray[2]);
    if (this.markSubDomainArray[3] !== undefined)
      localStorage.setItem("job_SD4", this.markSubDomainArray[3]);
  }

  OnSubmit(
    job_title,
    Job_Descreption,
    Level,
    Minimum_experience,
    prefered_city
  ) {
    if (this.domainIsTech) this.finalSubDomain = this.finalTechSubdomain;
    // this.setTechSubdomains();
    else if (this.domainIsMark) this.finalSubDomain = this.finalMarkSubdomain;
    // this.setMarkSubdomains();
    this.quizService
      .jobview(
        job_title.value ? job_title.value : "Not Added",
        Job_Descreption.value ? Job_Descreption.value : "Not Added",
        Level.value ? Level.value : 0,
        Minimum_experience.value ? Minimum_experience.value : 0,
        prefered_city.value ? prefered_city.value : "Not Added",
        this.fields ? this.fields : null,
        this.finalSubDomain ? this.finalSubDomain : ""
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(["/job-listings"]);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}

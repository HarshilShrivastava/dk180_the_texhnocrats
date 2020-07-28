import { Component, OnInit } from "@angular/core";
import { Organ } from "../shared/organ.model";
import { QuizService } from "../shared/quiz.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Component({
  selector: "app-orcreate",
  templateUrl: "./orcreate.component.html",
  styleUrls: ["./orcreate.component.less"],
})
export class OrcreateComponent implements OnInit {
  organ: Organ;
  emailPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$";
  urlPattern = "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$";

  constructor(
    private quizService: QuizService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.organ = {
      Name: "",
      Address: "",
      Email: "",
      City: "",
      State: "",
      Registration_no: null,
      website: "",
    };
  }

  OnSubmit(form: NgForm) {
    if (localStorage.getItem("token")) {
      this.quizService.createView(form.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res.sucess === true) this.router.navigate(["/orview"]);
          else {
            let dialogRef = this.dialog.open(ErrorDialogComponent, {
              height: "150px",
              data: "Oops! Could not create your profile right now, please try again in sometime.",
            });
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      this.router.navigate(["/organization"]);
    }
  }
}

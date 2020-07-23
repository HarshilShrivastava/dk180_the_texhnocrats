// import {Injectable} from "@angular/core";
// import {HttpClient, HttpResponse} from "@angular/common/http";
// import 'rxjs/add/operator/map';
// import {User} from "../shared/user.model"

// @Injectable()
// export class UserService {
//   constructor(private http: HttpClient) {}

//   getUser() {
//     return this.http.get('/api/user')
//   }
// }

import { Injectable } from '@angular/core';
import { User} from './user.model';
import { Organ} from './organ.model';

import { HttpClient , HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Local } from 'protractor/built/driverProviders';
import { QuizService } from './quiz.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class UserService{
    public aaya: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public candidatehai: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public organizationhai: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    organization = localStorage.getItem("Is_Organization")
    candidate = localStorage.getItem("Is_Candidate")
    tok = localStorage.getItem("token")
    name: string;

    constructor(
        private http: HttpClient,
        public quizService: QuizService
    ) { }

    ngOnInit(){
        if(this.organization === "true")
            this.organizationhai.next(true)
        if(this.candidate === 'true')
            this.candidatehai.next(true)
    }

    isLoggedIn(){
        if(localStorage.getItem("token"))
            return true;
        else 
            return false;
    }

    isCandidate(){
        if(this.candidate === 'true'){
            return true;
        }
        else
            return false;
    }

    isOrganization(){
        if(this.organization === "true"){
            return true;
        }
        else
            return false;
    }

    getUserName(){
        if(localStorage.getItem("Name")){
            this.aaya.next(true)
        }
    }

    logOut(){
        localStorage.clear();
        console.log("Logged out");
        
    }

    // getUserName(){
    //     if(this.tok !== undefined && this.tok !== "undefined" && this.tok !== null ){
    //       this.quizService.canView().subscribe((data: any) => {
    //         console.log(data);
    //         this.name = data.data.Name;
    //         localStorage.setItem("Name", this.name)
    //       });
    //     }
    //     return this.name;
    //   }
}




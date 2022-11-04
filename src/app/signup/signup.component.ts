import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router
    ) {  }

  ngOnInit(): void {
  }

  onSignUp (signUpCreds: {FirstName:string, LastName: string, Email:string, Password: string}){
    
    axios.post('http://104.197.104.222/v1/api/auth/signup', {
      data: signUpCreds
    })
    .then( (response) => {
      alert("If the entered email is correct you will receive OTP");
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  checkOtp(otp: {otp:number}){

    if(otp != null) {
      axios.post('http://104.197.104.222/v1/api/auth/verifyEmail', {
        data: otp
        })
        .then( (response) => {
          this.router.navigate(['/userDashboard'])
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong, please try again later.")
        });
      } 
      else {
        alert("Invalid OTP");
      }
    } 

  resendOtp() {
    axios.post('104.197.104.222/v1/api/auth/resendOtp');
  }
}
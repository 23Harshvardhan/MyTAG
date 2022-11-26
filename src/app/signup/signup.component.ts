import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosHeaders } from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private cookie_name='';
  private all_cookies:any='';

  constructor(
    private router:Router,
    private cookieService:CookieService,
    private http:HttpClient
    ) {  }

    setCookie(token:string){
      this.cookieService.set('jwt', token);
    }
     
    deleteCookie(cookieName:string){
      this.cookieService.delete(cookieName);
    }
     
    deleteAll(){
      this.cookieService.deleteAll();
    }

  ngOnInit(): void {
    this.all_cookies=this.cookieService.getAll();
  }

  onSignUp (signUpCreds: {FirstName:string, LastName: string, Email:string, Password: string}){
    axios.post('http://34.131.186.218/v1/api/auth/signup', {
      data: signUpCreds
    })
    .then( (response) => {
      alert("If the entered email is correct you will receive OTP");
      this.setCookie(response.data.data.token);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  checkOtp(otp: {otp:number}){
    const cookie = {
      headers:{
        cki: this.cookieService.get("jwt")
      } 
    }

    if(otp != null) {
      axios.post('http://34.131.186.218/v1/api/auth/verifyEmail', {
        data: otp
        }, cookie)
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
    axios.post('34.131.186.218/v1/api/auth/resendOtp');
  }
}
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private cookieService:CookieService
  ) { }

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
  }

  otp = ""

  sendOtp() {
    const cookie = {
      headers:{
        cki: this.cookieService.get("jwt")
      } 
    }

    axios.post('http://185.208.207.55/v1/api/auth/resendOtp', cookie)
    .then ((response) => {
      console.log(response);
    })
    .catch ((error) => {
      console.log(error);
      alert("There was a problem. Please try again later.")
    })
  }

  verifyOtp() {
    var otparea = document.getElementById("otpArea") as HTMLInputElement;
    this.otp = otparea!.value;

    const cookie = {
      headers:{
        cki: this.cookieService.get("jwt")
      } 
    }

    axios.post('http://185.208.207.55/v1/api/auth/verifyEmail', {data: this.otp}, cookie)
    .then ((response) => {
      console.log(response);
    })
    .catch ((error) => {
      console.log(error);
      alert("There was a problem. Please try again later.")
    })
  }
}

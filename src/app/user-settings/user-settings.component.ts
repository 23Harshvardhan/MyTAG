import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.verifyToken();
  }

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  otp = ""

  verifyToken() {
    axios.get('', this.cookie)
    .then((response) => {
      //Do nothing
    })
    .catch((error) => {
      console.log(error);
      this.router.navigate(['/login']);
    })
  }

  sendOtp() {
    axios.post('http://34.131.186.218/v1/api/auth/resendOtp', this.cookie)
    .then ((response) => {
      alert("OTP has be sent successfully!");
    })
    .catch ((error) => {
      console.log(error);
      alert("There was an error. Please send console log to developer.")
    })
  }

  verifyOtp() {
    var otparea = document.getElementById("otpArea") as HTMLInputElement;
    this.otp = otparea!.value;

    axios.post('http://34.131.186.218/v1/api/auth/verifyEmail', {data: this.otp}, this.cookie)
    .then ((response) => {
      alert("Email has been verified!");
    })
    .catch ((error) => {
      console.log(error);
      alert("There was an error. Please send console log to developer.")
    })
  }
}

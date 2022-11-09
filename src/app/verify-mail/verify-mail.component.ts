import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit {

  constructor(
    public router:Router,
    private cookieService: CookieService
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

  checkOtp(otp: {otp:number}){
    axios.post('http://104.197.104.222/v1/api/auth/verifyEmail', {
      data: otp
    })
    .then( (response) => {
      this.setCookie(response.data.data.token);
      this.router.navigate(['/userDashboard'])
    })
    .catch((error) => {
      console.log(error);
    });
  }

  resendOtp() {
    axios.post('104.197.104.222/v1/api/auth/resendOtp');
  }
}

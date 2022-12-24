import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    public router:Router,
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

  login(loginCreds : {Email:string, Username:string, Password:string}){
    axios.post('http://185.208.207.55/v1/api/admin/login', {
      data: loginCreds
    })
    .then ((response) => {
      this.setCookie(response.data.data.token);
      this.router.navigate(['/dashboard']);
    })
    .catch ((error) => {
      console.log(error);
      alert("There was an error. Please send console log to developer.")
    })
  }
}

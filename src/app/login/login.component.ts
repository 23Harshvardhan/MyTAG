import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public router:Router,
    private cookieService:CookieService
  ) { }

  setCookie(token:string){
    this.cookieService.set('jwt', token);
  }

  ngOnInit(): void {
  }

  login(loginCreds : {Email:string, Password:string}){
    axios.post('http://185.208.207.55/v1/api/auth/signin', {
      data: loginCreds
    })
    .then ((response) => {
      this.setCookie(response.data.data.token);
      this.router.navigate(['/userDashboard']);
    })
    .catch ((error) => {
      if(error.code == "ERR_NETWORK") {
        alert("It seems that you are offline. Please check your network status.");
      }
      else{
        console.log(error);
        alert("There was an error. Please send console log to developer.");
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  login(loginCreds : {Email:string, Password:string}){
    axios.post('http://185.208.207.55/v1/api/auth/signin', {
      data: loginCreds
    })
    .then ((response) => {
      this.router.navigate(['/userDashboard']);
    })
    .catch ((error) => {
      console.log(error);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private router:Router
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
    this.onLoad();
  }

  onLoad (){
    const cookie = {
      headers:{
        cki: this.cookieService.get("jwt")
      } 
    }

    axios.get('http://185.208.207.55/v1/api/activities/dashboard', cookie)
    .then( (response) => {
      // Enter Code Here
    })
    .catch( (error) => {
      console.log(error);
      this.router.navigate(['/login']);
    });
  }
}

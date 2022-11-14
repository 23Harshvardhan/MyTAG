import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  constructor(
    private router:Router,
    private cookieService:CookieService
  ) { }

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  length;
  users = [];

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    axios.get('http://185.208.207.55/v1/api/admin/analytics/getusers', this.cookie)
    .then((response) => {
      this.length = response.data.data.length;
      
      for(var i = 0; i < this.length; i++) {
        this.users.push({
          AccountType: response.data.data[i].Account_type,
          CardLimit: response.data.data[i].Card_limit,
          Email: response.data.data[i].Email,
          FirstName: response.data.data[i].FirstName,
          LastName: response.data.data[i].LastName,
          UserID: response.data.data[i].UserID,
          Verified: response.data.data[i].verified
        })
      }

      console.log(this.users);
    })
    .catch((error) => {
      console.log(error);
      this.router.navigate(['/']);
    });
  }
}

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

  //Variable storing cookies. This is send along with every request requiring cookies.
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

  //Function to take indexing of account type and return suitable string to be displayed in front-end.
  filterAccountType(rawAccountType:string) {
    if(rawAccountType == "0") {
      return "Personal";
    }
    else {
      return "Unknown"
    }
  }

  //Function to take indexing of account verification status and return suitable string to be displayed in front-end.
  filterVerificationStatus(rawVerificationStatus:string) {
    if(rawVerificationStatus == "0") {
      return "Unverified";
    }
    else {
      return "Verified";
    }
  }

  //Function be to triggered on page load. Calls API to load all the existing users and their details. In case of error, admin is redirected to home page.
  onLoad() {
    axios.get('http://185.208.207.55/v1/api/admin/analytics/getusers', this.cookie)
    .then((response) => {
      this.length = response.data.data.length;
      
      for(var i = 0; i < this.length; i++) {
        this.users.push({
          AccountType: this.filterAccountType(response.data.data[i].Account_type),
          CardLimit: response.data.data[i].Card_limit,
          Email: response.data.data[i].Email,
          FirstName: response.data.data[i].FirstName,
          LastName: response.data.data[i].LastName,
          UserID: response.data.data[i].UserID,
          Verified: this.filterVerificationStatus(response.data.data[i].verified)
        })
      }
    })
    .catch((error) => {
      console.log(error);
      this.router.navigate(['/']);
    });
  }
}

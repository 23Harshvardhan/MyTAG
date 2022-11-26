import { Component } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  constructor(
    private router:Router,
    private cookieService:CookieService
  ) { }

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  responseData = []

  ngOnInit(): void {
    this.checkAuth();
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }

  checkAuth() {
    axios.get('http://34.131.186.218/v1/api/admin', this.cookie).
    then((response) => {
      this.loadData();
    })
    .catch((error) => {
      console.log(error);
      this.router.navigate(['/']);
    });
  }

  loadData() {
    axios.get('http://34.131.186.218/v1/api/admin/analytics/getusers', this.cookie)
    .then((response) => {
      this.responseData = response.data.data;
      // console.log(this.responseData);
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem loading date. Please refresh page.");
    });
  }
}

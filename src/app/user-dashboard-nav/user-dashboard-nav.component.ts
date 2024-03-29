import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-nav',
  templateUrl: './user-dashboard-nav.component.html',
  styleUrls: ['./user-dashboard-nav.component.scss']
})
export class UserDashboardNavComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    // this.onLoad();
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }

  reroute(path:string) {
    
  }

  // onLoad (){
  //   const cookie = {
  //     headers:{
  //       cki: this.cookieService.get("jwt")
  //     } 
  //   }

  //   axios.get('http://185.208.207.55/v1/api/activities/dashboard', cookie)
  //   .then( (response) => {
  //     var name = response.data.userInfo.Name;
  //     var splitted = name.split(" ", 1)
  //     var usrName = document.getElementById("userName");
  //     usrName!.innerText=splitted;
  //   })
  //   .catch( (error) => {
  //     console.log(error);
  //     this.router.navigate(['/login']);
  //   });
  // }
}

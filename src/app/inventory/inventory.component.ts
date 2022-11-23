import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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
    axios.get('http://34.70.242.122/v1/api/admin', this.cookie).
    then((response) => {
      this.loadData();
    })
    .catch((error) => {
      console.log(error);
      this.router.navigate(['/']);
    });
  }

  loadData() {
    axios.get('http://34.70.242.122/v1/api/admin/analytics/getcards', this.cookie)
    .then((response) => {
      this.responseData = response.data.data;
      console.log(this.responseData);
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem loading date. Please refresh page.");
    });
  }

  addCards() {
    var qtyField = document.getElementById("qty") as HTMLInputElement;
    var qty = qtyField.value;

    if(parseInt(qty) > 0) {
      axios.post('http://34.70.242.122/v1/api/admin/updatecard/bulkadd', {"amount": qty}, this.cookie)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("There was a problem creating card. Please try again later.");
      });
    }
  }

  editCard(CardID:string) {
    this.router.navigate(['/editCard/' + CardID]);
  }
}

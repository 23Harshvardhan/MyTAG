import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

@Component({
  selector: 'app-active-cards',
  templateUrl: './active-cards.component.html',
  styleUrls: ['./active-cards.component.scss']
})
export class ActiveCardsComponent implements OnInit {

  ngOnInit(): void {
    this.loadData();
  }

  constructor(
    private cookieService:CookieService
  ) {}

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  cards = []
  activeCards = []

  loadData() {
    axios.get('http://34.70.242.122/v1/api/admin/analytics/getcards', this.cookie)
    .then((response) => {
      this.cards = response.data.data;
      this.cards.forEach(element => {
        if(element.published == "1") {
          this.activeCards.push(element);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem fetching cards. Please try again.");
    })
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }
}

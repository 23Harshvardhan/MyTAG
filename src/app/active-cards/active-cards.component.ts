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
  canvasCards = []
  card = {
    CardID: "",
    Reg_date: "",
    Type: "",
    AccountID: "",
    AccountName: "",
    FirstName: "",
    LastName: "",
    UserID: "",
    MobileNo: "",
    Views: "",
    Status: ""
  }

  loadData() {
    axios.get('http://34.131.186.218/v1/api/admin/analytics/getcards?Status=active', this.cookie)
    .then((response) => {
      this.cards = response.data.data;

      this.cards.forEach(element => {
        var fullName = element.Name.split(' ');
        var firstName = fullName[0];
        var lastName = fullName[1];

        if(lastName == null) {
          lastName = "-";
        }

        var type:string = "-";

        if(element.Type == null) {
          this.card.Type = type;
        }
        else {
          this.card.Type = element.Type;
        }

        this.card.CardID = element.CardID;
        this.card.Reg_date = element.Reg_date;
        this.card.AccountID = element.UserID;
        this.card.FirstName = firstName;
        this.card.LastName = lastName;
        this.card.AccountName = element.Name;
        this.card.UserID = element.Email;
        this.card.MobileNo = element.Phone;
        this.card.Views = element.Views;
        this.card.Status = element.Status;

        this.canvasCards.push(this.card);
      })
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

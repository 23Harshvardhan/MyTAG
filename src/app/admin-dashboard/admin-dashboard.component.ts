import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  cards = [];
  length = null;
  apiRoot = "http://185.208.207.55/v1/";

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  onLoad (){
    //Stores the total number of cards in a user's account
    axios.get('http://185.208.207.55/v1/api/admin/analytics/getcards', this.cookie)
    .then( (response) => {
      //Storing number of cards from response.
      this.length = response.data.data.length;

      //Storing card id and card name in a external variable to be accessed from frontend
      for(var i = 0; i < this.length; i++) {
        this.cards.push({
          cardName: response.data.data[i].Name,
          cardId: response.data.data[i].CardID,
          cardImage: response.data.data[i].Image
        })
      }
    })
    .catch( (error) => {
      console.log(error);
      this.router.navigate(['/adminLogin']);
    });
  }

  openCard(cardId:string) {
    this.router.navigate(['/cardPreview/' + cardId])
  }

  editCard(cardId:string) {
    this.router.navigate(['/editCard/' + cardId]);
  }

  deleteCard(cardId:string) {
    axios.delete('http://185.208.207.55/v1/api/activities/card_data/deletecard?id=' + cardId, this.cookie)
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem deleting card. Please try again later.");
    })
  }
}

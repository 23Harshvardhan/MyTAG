import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    this.onLoad();
  }

  //Array storing card ID and card names from response.
  cards = []

  //Stores the cookie responsible for logging in and verifying current user.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  //Function to load cards on page initialization. Called in "ngOnInit()"
  //On success it dashboard will load available cards and on fail will redirect back to login after logging error in console.
  onLoad (){
    //Stores the total number of cards in a user's account
    length = null;

    axios.get('http://185.208.207.55/v1/api/activities/dashboard', this.cookie)
    .then( (response) => {
      //Storing number of cards from response.
      length = response.data.userInfo.cards.length;

      //Storing card id and card name in a external variable to be accessed from frontend
      for(var i = 0; i < length; i++) {
        this.cards.push({
          cardName: response.data.userInfo.cards[i].Name,
          cardId: response.data.userInfo.cards[i].CardID
        })
      }
    })
    .catch( (error) => {
      console.log(error);
      this.router.navigate(['/login']);
    });
  }

  //Function to delete card. Takes card ID as parameter and sends delete request with card ID as query.
  //On success will refresh page and on fail will log error and show alert.
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

  //Function to open card. Takes card ID as parameter and redirects to card preview page.
  openCard(cardId:string) {
    this.router.navigate(['/cardPreview/' + cardId])
  }

  //Function to edit card. Takes card ID as parameter and redirects to edit card page.
  editCard(cardId:string) {
    this.router.navigate(['/editCard/' + cardId]);
  }
}

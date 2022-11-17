import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import { Router } from '@angular/router';
import multer from 'multer';

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

  cards = []; //Variable storing all the cards and their data in dictionary form.
  length = null; //Variable storing the lenght on the total cards. Used in FOR loop to iterate through all the cards.
  apiRoot = "http://185.208.207.55/v1/"; //Variable storing base URL for all API calls.
  nameQuery; //Variable to store the entered name in search query.

  //Variable storing cookies. This is sent with every API request.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  //Function to be triggered when the page loads. This function calls the API to load all existing cards and draw them on canvas.
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
          cardImage: response.data.data[i].Image,
          userId: response.data.data[i].UserID
        })
      }
    })
    .catch( (error) => {
      console.log(error);
      this.router.navigate(['/adminLogin']);
    });
  }

  //Function to open a card as admin.
  openCard(cardId:string) {
    this.router.navigate(['/adminCardPreview/' + cardId])
  }

  //Function to edit a card as admin.
  editCard(cardId:string) {
    this.router.navigate(['/editCard/' + cardId]);
  }

  //Function to delete a card as admin.
  deleteCard(CardID:string, UserID:string) {
    axios.delete('http://185.208.207.55/v1/api/admin/updatecard/delete?CardID=' + CardID + '&UserID=' + UserID, this.cookie)
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem deleting card. Please try again later.");
    })
  }

  //Function to be called on every key stroke in the search field. This function gets the entered text and stores it in a variable to be used by front-end.
  searchByName() {
    var nameQuery = document.getElementById("nameSearchField") as HTMLInputElement;
    this.nameQuery = nameQuery.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  cardId; //Variable to store card ID fetched from URL query.

  //Variable to store the fetched details from the card.
  data = {
    "Name": "",
    "Job_title": "",
    "Department": "",
    "Company_name": "",
    "Accreditations": "",
    "Headline": "",
    "Email": "",
    "Phone": "",
    "Company_URL": "",
    "Link": "",
    "Address": "",
    "Twitter": "",
    "Instagram": "",
    "Linkedin": "",
    "Facebook": "",
    "Youtube": "",
    "Snapchat": "",
    "Tiktok": "",
    "Twitch": "",
    "Yelp": "",
    "Whatsapp": "",
    "Signal_link": "",
    "Discord": "",
    "Skype": "",
    "Telegram": "",
    "GitHub": "",
    "Calendy": "",
    "PayPal": "",
    "Image": ""
  }

  //Stores cookies responsible for login and user verification. Required almost everytime while sending POST or GET request.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }
  apiRoot = "http://34.70.242.122/v1/";
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.cardId = this.activatedRoute.snapshot.paramMap.get('id'); //Gets the card ID from URL query.
    this.getData(this.cardId); //Calls the function with card ID as parameter to get data from the relevant card.
  }

  //Function to edit card with card ID as parameter.
  editCard(cardId:string) {
    this.router.navigate(['/editCard/' + cardId]);
  }

  //Function to get card data using API call with card ID as query.
  //On success will return entered details of the card which was requested and on fail will log error in console and slow alert.
  getData(cardId:string) {
    axios.get('http://34.70.242.122/v1/api/activities/card_data/readcard?id=' + cardId, this.cookie)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data[0];

      //SCRAP CODE SCRAP CODE SCRAP CODE ----- NEEDS TO BE REMOVED
      if(this.data.Signal_link == "null" || this.data.Signal_link == null) {
        this.data.Signal_link = "";
      }
      if(this.data.GitHub == "null" || this.data.GitHub == null) {
        this.data.GitHub = "";
      }
      if(this.data.Calendy == "null" || this.data.Calendy == null) {
        this.data.Calendy = "";
      }
      if(this.data.PayPal == "null" || this.data.PayPal == null) {
        this.data.PayPal = "";
      }
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error! Please send console log to developer.");
    })
  }
}
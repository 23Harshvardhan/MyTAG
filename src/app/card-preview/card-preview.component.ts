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
    "Calendly": "",
    "PayPal": "",
    "Image": ""
  }

  //Stores cookies responsible for login and user verification. Required almost everytime while sending POST or GET request.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }
  apiRoot = "http://185.208.207.55/v1/";
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
    axios.get('http://185.208.207.55/v1/api/activities/card_data/readcard?id=' + cardId, this.cookie)
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
      if(this.data.Calendly == "null" || this.data.Calendly == null) {
        this.data.Calendly = "";
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

  publishCard(){
    axios.put('http://185.208.207.55/v1/api/activities/card_data/updatecard?id=' + this.cardId, {data:{"Published": 1}}, this.cookie)
    .then((response) => {
      alert("Card has been published successfully.");
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem performing this action. Please send log to developer.")
    })
  }

  cardViewLink = "http://185.208.207.55:4200/viewCard/" + this.activatedRoute.snapshot.paramMap.get('id');

  unpublishCard() {
    axios.put('http://185.208.207.55/v1/api/activities/card_data/updatecard?id=' + this.cardId, {data:{"Published": 0}}, this.cookie)
    .then((response) => {
      alert("Card has been unpublished successfully.");
    })
    .catch((error) => {
      console.log(error);
      alert("There was a problem performing this action. Please send log to developer.")
    })
  }

  copyLink(link:string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
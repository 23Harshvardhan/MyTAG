import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent {

  constructor(
    private cookieService:CookieService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

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
    "Github": "",
    "Calendly": "",
    "Paypal": "",
    "Image": ""
  }

  cardId;

  accreds:string[] = [];

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  ngOnInit(): void {
    // Gets the card ID from URL query.
    this.cardId = this.activatedRoute.snapshot.paramMap.get('id');
    
    //Calls the function with card ID as parameter to get data from the relevant card.
    this.getData(this.cardId);
  }

  // Function to load the card image into preview card.
  loadCardImage() {
    if(this.data.Image != "" || this.data.Image != null) {
      var cardImg = document.getElementById("cardImage");
      cardImg.style.backgroundImage = "url('http://185.208.207.55/v1/" + this.data.Image + "')";
    }
  }

  getData(cardId:string) {
    axios.get('http://185.208.207.55/v1/api/card/?id=' + cardId)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data[0];

      this.loadCardImage();

      //SCRAP CODE SCRAP CODE SCRAP CODE ----- NEEDS TO BE REMOVED
      if(this.data.Signal_link == "null" || this.data.Signal_link == null) {
        this.data.Signal_link = "";
      }
      if(this.data.Github == "null" || this.data.Github == null) {
        this.data.Github = "";
      }
      if(this.data.Calendly == "null" || this.data.Calendly == null) {
        this.data.Calendly = "";
      }
      if(this.data.Paypal == "null" || this.data.Paypal == null) {
        this.data.Paypal = "";
      }
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error! Please send console log to developer.");
    })
  }
}

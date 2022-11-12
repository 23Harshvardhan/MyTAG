import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  selectedFile:File = null;

  constructor(
    private cookieService:CookieService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  //Empty variable to store card ID from URL query.
  cardId;

  ngOnInit(): void {
    // Gets the card ID from URL query.
    this.cardId = this.activatedRoute.snapshot.paramMap.get('id');
    
    //Calls the function with card ID as parameter to get data from the relevant card.
    this.getData(this.cardId);
  }

  //Stores the current input block name to correctly keep track of opened window.
  currentBlockName = "";

  //String array stored all split accreditions so they can be access from the front end easily.
  accreds:string[] = [];

  //Array storing all the socials
  socials:string[] = ["twitter","instagram","linkedin","facebook","snapchat","tiktok","twitch","yelp","youtube"];

  //Variable to store the card's data. Needs to be overridden by the data fetched from API call.
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
    "PayPal": ""
  }

  //Stores cookies responsible for login and user verification. Required almost everytime while sending POST or GET request.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  //Function to show information input window. Takes the block name as parameter from to save the data in the relevant slot.
  showInputWind(blockName:string) {
    this.currentBlockName = blockName;

    const warning1 = document.getElementById("warning1");
    
    var inputWind = document.getElementById("inputWind");
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    inputWind!.style.display = "block";
    inputArea.focus();
    var temp = this.data[blockName as keyof typeof this.data];
    inputArea.value = temp;

    if(this.currentBlockName == "Accreditations") {
      warning1!.style.display = "block";
    }
    else{
      warning1!.style.display = "none";
    }
  }

  //Function to show image upload window.
  showImageInputWind() {
    var inputWind = document.getElementById("imageInputWind");
    inputWind!.style.display = "block";
  }

  //Function responsive for live preview of the entered information. To be called in the key-press event of input field. 
  updatePreview() {
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    var temp = inputArea.value;
    this.data[this.currentBlockName as keyof typeof this.data] = temp;
  }

  //Function to save entered details close the input window.
  closeWind() {
    var inputWind = document.getElementById("inputWind");
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    var temp = inputArea.value;
    this.data[this.currentBlockName as keyof typeof this.data] = temp;
    inputWind!.style.display = "none";

    if(this.currentBlockName == "Accreditations") {
      if(temp != ""){
        this.accreds = inputArea.value.split(',');
      }
    }
  }

  //Function to upload selected image and close the upload window for card banner/logo.
  //Will upload image using service and then close the window.
  //BROKEN BROKEN BROKEN
  closeUploadWind() {
    var uploadWind = document.getElementById("imageInputWind");
    //BROKEN BROKEN BROKEN ----- CODE NEEDS TO BE HERE
    uploadWind!.style.display = "none";
  }

  //Function to be called when user clicks on links. 
  //NOT WORKING NOT WORKING NOT WORKING
  openUrl(service:string) {
    window.open(this.data[service as keyof typeof this.data], "_blank");
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

  updateCard() {
    alert("This function is not implemented yet.");

    // axios.post('http://185.208.207.55/v1/api/activities/card_data/createcard', {
    //   data: this.data
    // }, this.cookie)
    // .then ((response) => {
    //   this.router.navigate(['/userDashboard']);
    // })
    // .catch ((error) => {
    //   console.log(error);
    //   alert("There was a problem. Please try again later.")
    // })
  }

  //Function called by back button to go back to dashboard.
  backToDash() {
    this.router.navigate(['/userDashboard']);
  }
}

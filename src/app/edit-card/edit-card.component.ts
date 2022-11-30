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

  file;
  imageUrl = "";

  // Event function to be called when a new image is selected for banner using dialog.
  // This function reads the selected file and converts it into base64 and stores it in image URL variable.
  onFileSelected(event) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload=(event:any) => {
        this.imageUrl = event.target.result;
        this.setImage();
      }
    }
  }

  // Function to set the image URL stored in variable to the card image in preview panel.
  setImage() {
    var cardImage = document.getElementById("cardImage");
    cardImage.style.backgroundImage = "url('" + this.imageUrl + "')";
  }

  ngOnInit(): void {
    // Gets the card ID from URL query.
    this.cardId = this.activatedRoute.snapshot.paramMap.get('id');
    
    //Calls the function with card ID as parameter to get data from the relevant card.
    // this.getData(this.cardId);
  }

  // Function to load the card image into preview card.
  loadCardImage() {
    if(this.data.Image != "" || this.data.Image != null) {
      var cardImg = document.getElementById("cardImage");
      cardImg.style.backgroundImage = "url('http://34.131.186.218/v1/" + this.data.Image + "')";
    }
  }

  //Stores the current input block name to correctly keep track of opened window.
  currentBlockName = "";

  //String array stored all split accreditions so they can be access from the front end easily.
  accreds:string[] = [];

  //Array storing all the socials
  socials:string[] = ["twitter","instagram","linkedin","facebook","snapchat","tiktok","twitch","yelp","youtube"];

 // Variable to store card data recovered via API.
 data = {
  "Batch": "",
  "CardID": "",
  "UserID": "",
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
  "Discord": "",
  "Signal_link": "",
  "Telegram": "",
  "Calendly": "",
  "Github": "",
  "Paypal": "",
  "Skype": "",
  "Image": "",
  "Published": "",
  "Created_date": "",
  "Reg_date": "",
  "Status": "",
  "Type": "",
  "Created_by": ""
}

  //Stores cookies responsible for login and user verification. Required almost everytime while sending POST or GET request.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  //Function to get card data using API call with card ID as query.
  //On success will return entered details of the card which was requested and on fail will log error in console and slow alert.
  getData(cardId:string) {
    axios.get('http://34.131.186.218/v1/api/activities/card_data/readcard?id=' + cardId, this.cookie)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data[0];

      this.loadCardImage();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error! Please send console log to developer.");
    })
  }

  updateCard(cardId:String) {
    axios.put('http://34.131.186.218/v1/api/activities/card_data/updatecard?id=' + cardId, {data: this.data}, this.cookie)
    .then ((response) => {
      this.uploadImage();
    })
    .catch ((error) => {
      console.log(error);
      alert("There was a problem. Please try again later.");
    })
  }

  uploadImage() {
    var formdata = new FormData();
    if(this.file != null) {
      formdata.append('', this.file);

      axios.put('http://34.131.186.218/v1/api/activities/card_data/updateimage?id=' + this.cardId, formdata, this.cookie)
      .then((response) => {
        this.router.navigate(['/userDashboard']);
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating card image. Please send console log to developer.");
      })
    }
    else {
      this.router.navigate(['/userDashboard']);
    }
  }

  //Function called by back button to go back to dashboard.
  backToDash() {
    this.router.navigate(['/userDashboard']);
  }
}

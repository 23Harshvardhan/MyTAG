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

  // Empty variable to store user ID from data received over API.
  userId;

  file:File;
  imageUrl = "http://34.131.186.218/v1/images/default.jpg";

  // Event function to be called when a new image is selected for banner using dialog.
  // This function reads the selected file and converts it into base64 and stores it in image URL variable.
  onFileSelected(event) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload=(event:any) => {
        this.imageUrl = event.target.result;
      }
    }
  }

  selectFile() {
    var fileUpload = document.getElementById("FileUpload1");
    fileUpload.click();
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
      this.imageUrl = "http://34.131.186.218/v1/" + this.data.Image;
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

  // editedData = {
    // "Name": this.data.Name,
    // "Job_title": this.data.Job_title,
    // "Department": this.data.Department,
    // "Company_name": this.data.Company_name,
    // "Accreditations": this.data.Accreditations,
    // "Headline": this.data.Headline,
    // "Email": this.data.Email,
    // "Phone": this.data.Phone,
    // "Company_URL": this.data.Company_URL,
    // "Link": this.data.Link,
    // "Address": this.data.Address,
    // "Twitter": this.data.Twitter,
    // "Instagram": this.data.Instagram,
    // "Linkedin": this.data.Linkedin,
    // "Facebook": this.data.Facebook,
    // "Youtube": this.data.Youtube,
    // "Snapchat": this.data.Snapchat,
    // "Tiktok": this.data.Tiktok,
    // "Twitch": this.data.Twitch,
    // "Yelp": this.data.Yelp,
    // "Whatsapp": this.data.Whatsapp,
    // "Discord": this.data.Discord,
    // "Signal_link": this.data.Signal_link,
    // "Telegram": this.data.Telegram,
    // "Calendly": this.data.Calendly,
    // "Github": this.data.Github,
    // "Paypal": this.data.Paypal,
    // "Skype": this.data.Skype
  // }

  //Stores cookies responsible for login and user verification. Required almost everytime while sending POST or GET request.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  selectField(blockName:string) {
    this.currentBlockName = blockName;

    var inputField = document.getElementById(blockName) as HTMLInputElement;
    this.data[blockName as keyof typeof this.data] = inputField.value;
  }

  //Function to get card data using API call with card ID as query.
  //On success will return entered details of the card which was requested and on fail will log error in console and slow alert.
  getData(cardId:string) {
    axios.get('http://34.131.186.218/v1/api/admin/analytics/getcards?CardID=' + cardId, this.cookie)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data.data[0]
      this.loadCardImage();

      this.userId = this.data.UserID;
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error! Please send console log to developer.");
    })
  }

  updateCard(cardId:String, userId:string) {
    axios.put('http://34.131.186.218/v1/api/admin/updatecard/update', {CardID: cardId, CardData: {
      "Name": this.data.Name,
      "Job_title": this.data.Job_title,
      "Department": this.data.Department,
      "Company_name": this.data.Company_name,
      "Accreditations": this.data.Accreditations,
      "Headline": this.data.Headline,
      "Email": this.data.Email,
      "Phone": this.data.Phone,
      "Company_URL": this.data.Company_URL,
      "Link": this.data.Link,
      "Address": this.data.Address,
      "Twitter": this.data.Twitter,
      "Instagram": this.data.Instagram,
      "Linkedin": this.data.Linkedin,
      "Facebook": this.data.Facebook,
      "Youtube": this.data.Youtube,
      "Snapchat": this.data.Snapchat,
      "Tiktok": this.data.Tiktok,
      "Twitch": this.data.Twitch,
      "Yelp": this.data.Yelp,
      "Whatsapp": this.data.Whatsapp,
      "Discord": this.data.Discord,
      "Signal_link": this.data.Signal_link,
      "Telegram": this.data.Telegram,
      "Calendly": this.data.Calendly,
      "Github": this.data.Github,
      "Paypal": this.data.Paypal,
      "Skype": this.data.Skype
    }, UserID: userId}, this.cookie)
    .then ((response) => {
      this.uploadImage();
    })
    .catch ((error) => {
      console.log(error);
      alert("There was a problem. Please try again later.");
    })
  }

  uploadImage() {
    var data = new FormData();
    if(this.file != null) {
      data.append('media', this.file);
      axios.put('http://34.131.186.218/v1/admin/updatecard/updatecardimage?id=' + this.cardId + '&userID=' + this.userId, data, this.cookie)
      .then((response) => {
        this.router.navigate(['/inventory']);
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating card image. Please send console log to developer.");
      })
    }
    else {
      this.router.navigate(['/inventory']);
    }
  }

  //Function called by back button to go back to dashboard.
  backToDash() {
    this.router.navigate(['/inventory']);
  }
}

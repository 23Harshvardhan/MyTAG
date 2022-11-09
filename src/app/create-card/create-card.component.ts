import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private router:Router
  ) { }

  setCookie(token:string){
    this.cookieService.set('jwt', token);
  }
   
  deleteCookie(cookieName:string){
    this.cookieService.delete(cookieName);
  }
   
  deleteAll(){
    this.cookieService.deleteAll();
  }

  ngOnInit(): void {
  }

  currentBlockName = "";
  accreds:string[] = [];

  socials:string[] = ["twitter","instagram","linkedin","facebook","snapchat","tiktok","twitch","yelp","youtube"];

  data = {
    name: "",
    designation: "",
    companyName: "",
    accreditations: "",
    email: "",
    phone: "",
    companyUrl: "",
    link: "",
    address: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    snapchat: "",
    tiktok: "",
    twitch: "",
    yelp: "",
    youtube: "",
    whatsapp: "",
    signal: "",
    discord: "",
    skype: "",
    telegram: "",
    github: "",
    calendy: "",
    paypal: ""
  }

  postData = {
    "Name": this.data.name,
    "Job_title": this.data.designation,
    "Department": this.data.designation,
    "Company_name": this.data.companyName,
    "Accreditations": this.data.accreditations,
    "Headline": "",
    "Email": this.data.email,
    "Phone": this.data.phone,
    "Company_URL": this.data.companyUrl,
    "Link": this.data.link,
    "Address": this.data.address,
    "Twitter": this.data.twitter,
    "Twitter_label": "",
    "Instagram": this.data.instagram,
    "Instagram_label": "",
    "Linkedin": this.data.linkedin,
    "Linkedin_label": "",
    "Facebook": this.data.facebook,
    "Facebook_label": "",
    "Youtube": this.data.youtube,
    "Youtube_label": "",
    "Snapchat": this.data.snapchat,
    "Snapchat_label": "",
    "Tiktok": this.data.tiktok,
    "Tiktok_label": "",
    "Twitch": this.data.twitch,
    "Twitch_label": "",
    "Yelp": this.data.yelp,
    "Yelp_label": ""
  }

  showInputWind(blockName:string) {
    this.currentBlockName = blockName;

    const warning1 = document.getElementById("warning1");
    const warning2 = document.getElementById("warning2");
    
    var inputWind = document.getElementById("inputWind");
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    inputWind!.style.display = "block";
    var temp = this.data[blockName as keyof typeof this.data];
    inputArea.value = temp;

    if(this.currentBlockName == "accreditations") {
      warning1!.style.display = "block";
    }
    else{
      warning1!.style.display = "none";
      warning2!.style.display = "none";
    }
  }

  closeWind() {
    var inputWind = document.getElementById("inputWind");
    var contactSection = document.getElementById("contactSection")
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    var temp = inputArea.value;
    this.data[this.currentBlockName as keyof typeof this.data] = temp;
    inputWind!.style.display = "none";

    if(this.currentBlockName == "accreditations") {
      if(temp != ""){
        this.accreds = inputArea.value.split(',');
      }
    }
  }

  createCard() {
    const cookie = {
      headers:{
        cki: this.cookieService.get("jwt")
      } 
    }

    console.log({data: this.postData});

    // axios.post('http://185.208.207.55/v1/api/activities/card_data/createcard', {
    //   data: this.postData
    // }, cookie)
    // .then ((response) => {
    //   console.log(response);
    // })
    // .catch ((error) => {
    //   console.log(error);
    //   alert("There was a problem. Please try again later.")
    // })
  }
}
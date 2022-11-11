import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { FileUploadService } from '../file-upload.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  selectedFile:File = null;

  constructor(
    private cookieService:CookieService,
    private router:Router,
    private fileUploadService:FileUploadService,
    @Inject(DOCUMENT) private document: Document
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

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    var cardImage = document.getElementById("cardImage");
    // cardImage!.style.backgroundImage 
  }

  currentBlockName = "";
  accreds:string[] = [];

  socials:string[] = ["twitter","instagram","linkedin","facebook","snapchat","tiktok","twitch","yelp","youtube"];

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
    "WhatsApp": "",
    "Signal": "",
    "Discord": "",
    "Skype": "",
    "Telegram": "",
    "GitHub": "",
    "Calendy": "",
    "PayPal": ""
  }

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

  showImageInputWind() {
    var inputWind = document.getElementById("imageInputWind");
    inputWind!.style.display = "block";
  }

  updatePreview() {
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    var temp = inputArea.value;
    this.data[this.currentBlockName as keyof typeof this.data] = temp;
  }

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

  closeUploadWind() {
    var uploadWind = document.getElementById("imageInputWind");
    this.onUpload();
    uploadWind!.style.display = "none";
  }

  openUrl(service:string) {
    window.open(this.data[service as keyof typeof this.data], "_blank");
  }

  createCard() {
    const cookie = {
      headers:{
        cki: this.cookieService.get("jwt")
      } 
    }

    axios.post('http://185.208.207.55/v1/api/activities/card_data/createcard', {
      data: this.data
    }, cookie)
    .then ((response) => {
      this.router.navigate(['/userDashboard']);
    })
    .catch ((error) => {
      console.log(error);
      alert("There was a problem. Please try again later.")
    })
  }
}
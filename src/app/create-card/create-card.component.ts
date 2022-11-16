import { Component, Inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  selectedFile:File = null;

  constructor(
    private cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

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

  showTabs(tabName:string) {
    var personalInfo = document.getElementById("personalInfoTab");
    var basicInfo = document.getElementById("basicInfoTab");
    var socialInfo = document.getElementById("socialInfoTab");
    var communicationInfo = document.getElementById("communiationInfoTab");
    var businessInfo = document.getElementById("businessInfoTab");
    var paymentInfo = document.getElementById("paymentInfoTab");
    
    if(tabName == "personalInfoTab") {
      personalInfo.style.display = "block";
      basicInfo.style.display = "none";
      socialInfo.style.display = "none";
      communicationInfo.style.display = "none";
      businessInfo.style.display = "none";
      paymentInfo.style.display = "none";
    } else if(tabName == "basicInfoTab"){
      personalInfo.style.display = "none";
      basicInfo.style.display = "block";
      socialInfo.style.display = "none";
      communicationInfo.style.display = "none";
      businessInfo.style.display = "none";
      paymentInfo.style.display = "none";
    } else if(tabName == "socialInfoTab"){
      personalInfo.style.display = "none";
      basicInfo.style.display = "none";
      socialInfo.style.display = "block";
      communicationInfo.style.display = "none";
      businessInfo.style.display = "none";
      paymentInfo.style.display = "none";
    } else if(tabName == "communiationInfoTab"){
      personalInfo.style.display = "none";
      basicInfo.style.display = "none";
      socialInfo.style.display = "none";
      communicationInfo.style.display = "block";
      businessInfo.style.display = "none";
      paymentInfo.style.display = "none";
    } else if(tabName == "businessInfoTab"){
      personalInfo.style.display = "none";
      basicInfo.style.display = "none";
      socialInfo.style.display = "none";
      communicationInfo.style.display = "none";
      businessInfo.style.display = "block";
      paymentInfo.style.display = "none";
    } else if(tabName == "paymentInfoTab"){
      personalInfo.style.display = "none";
      basicInfo.style.display = "none";
      socialInfo.style.display = "none";
      communicationInfo.style.display = "none";
      businessInfo.style.display = "none";
      paymentInfo.style.display = "block";
    }
  }

  onUpload() {
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
    "Whatsapp": "",
    "Signal_link": "",
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
  
  backToDash() {
    this.router.navigate(['/userDashboard']);
  }
}
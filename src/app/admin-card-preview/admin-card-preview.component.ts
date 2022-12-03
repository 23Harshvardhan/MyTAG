import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-card-preview',
  templateUrl: './admin-card-preview.component.html',
  styleUrls: ['./admin-card-preview.component.scss']
})
export class AdminCardPreviewComponent implements OnInit{

  constructor(
    private cookieService:CookieService,
    private activatedRouter:ActivatedRoute,
    private router:Router
  ) {}

  // Variable to store recovered cookie from browser for verification purpose.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  // Variable to store the API url. This will be called during every API request.
  APIurl = "http://34.131.186.218/v1/";

  // Variable to store current card ID.
  cardID;

  // Variable to store card image url.
  cardImg;

  // Variable to store data for QR code.
  cardViewLink = "https://185.208.207.55:4200/viewCard/" + this!.cardID;

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

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Views',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true }
    }
  };

  public lineChartType: ChartType = 'line';

  ngOnInit(): void {
    this.cardID = this.activatedRouter.snapshot.paramMap.get('id');
    this.getData(this.cardID);
  }

  currentBlockName:string;
  file:File;
  userId:string;
  formdata = new FormData();
  imageUrl = "http://34.131.186.218/v1/images/default.jpg";

  selectFile() {
    var fileUpload = document.getElementById("FileUpload1");
    fileUpload.click();
  }

  toggleEditField(field:string) {
    var fieldToToggle = document.getElementById(field);
    fieldToToggle.classList.toggle("hidden");
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
      window.location.reload();
    })
    .catch ((error) => {
      console.log(error);
      alert("There was a problem. Please try again later.");
    })
  }

  uploadImage() {
    console.log(this.formdata);
    if(this.file != null) {
      axios.put('http://34.131.186.218/v1/admin/updatecard/updatecardimage?id=' + this.cardID + '&userID=' + this.userId, this.formdata, this.cookie)
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

  onFileSelected(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload=(event:any) => {
        this.imageUrl = event.target.result;
      }

      this.formdata.append("media", file);
    }

    console.log(this.formdata)
  }

  selectField(blockName:string) {
    this.currentBlockName = blockName;
    var inputField = document.getElementById(blockName) as HTMLInputElement;
    this.data[blockName as keyof typeof this.data] = inputField.value;
    console.log(this.data);
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }

  editCard() {
    this.router.navigate(['/editCard/' + this.cardID]);
  }

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

  loadCardImage() {
    if(this.data.Image != "" || this.data.Image != null) {
      this.imageUrl = "http://34.131.186.218/v1/" + this.data.Image;
    }
  }

}

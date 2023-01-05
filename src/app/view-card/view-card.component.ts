import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, provideProtractorTestingSupport } from '@angular/platform-browser';
import { VCard } from 'ngx-vcard';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent {

  constructor(
    private cookieService:CookieService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private sanitizer:DomSanitizer
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
    "Image": "",
    "Logo": "",
    "Banner": ""
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
    if(this.data.Banner != "" || this.data.Banner != null) {
      this.imageUrl = "http://185.208.207.55/v1/" + this.data.Banner;
    } 

    if(this.data.Logo != "" || this.data.Logo != null) {
      this.logoUrl = "http://185.208.207.55/v1/" + this.data.Logo;
    }
  }

  imagesToShow = [];

  imagesJson = {
    data: [

    ]
  }

  UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
      return true;
    else
      return false;
  }

  getData(cardId:string) {
    axios.get('http://185.208.207.55/v1/api/card/?id=' + cardId)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data[0];
      this.imagesJson = response.data[0].Images;
      
      this.splitImages();

      this.loadCardImage();
      
      this.phoneNumbers = this.data.Phone.split(';');
      this.emails = this.data.Email.split(',');
      this.websites = this.data.Link.split(',');
      this.addresses = this.data.Address.split('!');
      this.youtubeLinks = this.data.Company_URL.split(';');
      this.nameSplit = this.data.Name.split(' ');

      this.filterLink();

      this.getSocials();

      this.preloadSocials();
      this.preloadContact();
      this.preloadEmail();
      this.preloadWebsites();
      this.preloadAddresses();
      this.preloadYoutubeLinks();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error! Please send console log to developer.");
    })
  }

  logoUrl:string = "http://185.208.207.55/v1/banner/default.jpg";
  imageUrl:string = "http://185.208.207.55/v1/banner/default.jpg";

  redirectSocial(block:string) {
    var url = this.data[block as keyof typeof this.data];
    if(url.startsWith("https://")) {
      window.open(url, "_blank");
    } else {
      window.open("https://" + url, "_blank");
    }
  }

  linksDataJson = {
    "data": [
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      },
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      },
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      },
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      },
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      },
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      },
      {
        "link": "",
        "link_logo": "",
        "link_title": ""
      }
    ]
  }
  dataToSendJson = {
    "data": [

    ]
  }
  socialIndex = {
    'Twitter':'0',
    'Instagram':'1',
    'Linkedin':'2',
    'Facebook':'3',
    'Youtube':'4',
    'Snapchat':'5',
    'Tiktok':'6',
    'Twitch':'7',
    'Yelp':'8',
    'Discord':'9',
    'Whatsapp':'10',
    'Skype':'11',
    'Telegram':'12'
  }
  rawLink1 = "youtu.be/";
  rawLink2 = "watch?v=";
  rawLink3 = "&feature=youte.be";
  replaceLink1 = "https://www.youtube.com/embed/";
  replaceLink2 = "embed/";
  replaceLink3 = "";
  contactNums = [];
  contactTypes = [];
  phoneNumbers = [];
  totalContacts = [];
  emails = [];
  addresses = [];
  websites = [];
  youtubeLinks = [];
  finalLinks = [];
  socials = [];
  socalsInUse = [];
  activeLinks = [];
  totalLinks = [];
  totalSocials = [];
  totalYoutubeLinks = [];
  totalAddresses = [];
  totalEmails = [];
  totalWebsites = [];
  activeImages = [];

  preloadContact() {
    var length = this.phoneNumbers.length;
    if(this.phoneNumbers[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;

        var group = this.phoneNumbers[i].split('?');
        this.contactTypes.push(group[0]);
        this.contactNums.push(group[1]);

        this.totalContacts.push('contactGroup' + count.toString());
      }
    }
  }

  splitImages() {
    this.imagesJson.data.forEach(element => {
      if(this.UrlExists(element)) {
        this.imagesToShow.push(element);
      }
    })
  }

  filterLink() {
    this.youtubeLinks.forEach(element => {
      if(element.includes(this.rawLink1)) {
        var newL = element.replace(this.rawLink1, this.replaceLink1);
        this.finalLinks.push(newL);
        return '';
      } else if (element.includes(this.rawLink2)) {
        var newL = element.replace(this.rawLink2, this.replaceLink2);
        this.finalLinks.push(newL);
        return '';
      } else if (element.includes(this.rawLink3)) {
        var newL = element.replace(this.rawLink3, this.replaceLink3);
        this.finalLinks.push(newL);
        return '';
      } else {
        this.finalLinks.push(element);
        return '';
      }
    });
  }

  getSocials() {
    var availableSocials = ['Twitter','Instagram','Linkedin','Facebook','Youtube','Snapchat','Tiktok','Yelp','Discord','Whatsapp','Skype','Telegram','Twitch'];
    
    availableSocials.forEach(social => {
      if(this.data[social as keyof typeof this.data] != '') {
        this.socials.push(this.data[social as keyof typeof this.data]);
        this.socalsInUse.push(social);
      }
    });
  }

  preloadLinks() {
    var count:number = 1;
    this.linksDataJson.data.forEach(element => {
      if(element.link != "" && element.link_title != "") {
        var dataSet = {
          "link_logo": "http://185.208.207.55/v1/link_logos/" + this.cardId + "_" + count.toString() + ".jpg",
          "link": element.link,
          "link_title": element.link_title
        }
        this.dataToSendJson.data.push(dataSet);
        this.activeLinks.push(element);
        this.totalLinks.push('linkGroup' + count.toString());

        this['linkLogo' + count.toString()] = element.link_logo;
      }

      count++;
    });
  }

  preloadSocials() {
    var lenght = this.socials.length;
    if(this.socials[0] != '') {
      for(let i = 0; i < lenght; i++) {
        var count = i + 1;
        this.totalSocials.push('socialGroup' + count.toString());
      }
    }
  }

  preloadYoutubeLinks() {
    var length = this.youtubeLinks.length;
    if(this.youtubeLinks[0] != '') {
      for(let i = 0; i < length; i++) {
        var count = i + 1;
        this.totalYoutubeLinks.push('youtubeGroup' + count.toString());
      }
    }
  }

  preloadAddresses() {
    var length = this.addresses.length;
    if(this.addresses[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;
        this.totalAddresses.push('addressGroup' + count.toString());
      }
    }
  }

  preloadEmail() {
    var length = this.emails.length;
    if(this.emails[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;
        this.totalEmails.push('emailGroup' + count.toString());
      }
    }
  }

  preloadWebsites() {
    var length = this.websites.length;
    if(this.websites[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;
        this.totalWebsites.push('websiteGroup' + count.toString());
      }
    }
  }

  getSafeUrl(link:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  openLink(link:string) {
    if(link.startsWith("https://")) {
      window.open(link, "_blank");
    } else {
      window.open("https://" + link, "_blank");
    }
  }

  nameSplit = [];

  public vCard: VCard = {
    name: {
      firstNames: this.nameSplit[0],
      lastNames: this.nameSplit[1]
    },
    address: this.addresses[0],
    email: this.emails[0],
    organization: this.data.Company_name,
    telephone: this.phoneNumbers[0],
    url: this.websites[0]
  };
}

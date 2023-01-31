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

  // Variable of type boolean to keep track of the loading process of page.
  isPreLoading:Boolean = true;

  // Variable of type key-value pair to keep store all the data received from API call.
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

  // Variable of type string to keep track of the card ID received from activated route.
  cardId:string;

  accreds:string[] = [];

  // Variable to store and access cookies whenever needed by APIs.
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

  // Variable of type array to keep track of the image URLs that needs to be shown in the main card.
  imagesToShow = [];

  // Varibale in JSON format to store images received from API call.
  imagesJson = {
    data: []
  }

  // Function to check if a URL is valid or not. Returns true or false.
  UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
      return true;
    else
      return false;
  }

  filterSocials() {
    this.availableSocials.forEach(social => {
      if(this[social][0] != null) {
        if(this[social][0].length < 5) {
          this[social] = null;
        }
      }
    });
  }

  // Variables of type array to store multiple social media values.
  Twitter = [];
  Instagram = [];
  Linkedin = [];
  Facebook = [];
  Youtube = [];
  Snapchat = [];
  Tiktok = [];
  Yelp = [];
  Discord = [];
  Whatsapp = [];
  Skype = [];
  Telegram = [];
  Twitch = [];

  dataLinks = {
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

  dataImages = {
    data: []
  }

  totalImages = [];

  preloadImages() {
    var count:number = 1;
    this.dataImages.data.forEach(element => {
      if(this.UrlExists(element)) {
        this.totalImages.push('imageGroup' + count.toString());
        var pnl = document.getElementById('imageGroup' + count.toString());
        pnl.classList.remove('hidden');
        this.activeImages.push(element);
      }
      count++;
    });
  }

  // Function to make API call and get card data and handle it accordingly.
  getData(cardId:string) {
    axios.get('http://185.208.207.55/v1/api/card/?id=' + cardId)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data[0];
      this.dataLinks = response.data[0].External_links;
      this.dataImages = response.data[0].Images;
      
      // this.splitImages();

      this.loadCardImage();
      
      this.phoneNumbers = this.data.Phone.split(';');
      this.emails = this.data.Email.split(',');
      this.websites = this.data.Link.split(',');
      this.addresses = this.data.Address.split('!');
      this.youtubeLinks = this.data.Company_URL.split(';');
      this.nameSplit = this.data.Name.split(' ');

      this.Twitter = this.data.Twitter.split('~');
      this.Instagram = this.data.Instagram.split('~');
      this.Linkedin = this.data.Linkedin.split('~');
      this.Facebook = this.data.Facebook.split('~');
      this.Youtube = this.data.Youtube.split('~');
      this.Snapchat = this.data.Snapchat.split('~');
      this.Tiktok = this.data.Tiktok.split('~');
      this.Yelp = this.data.Yelp.split('~');
      this.Discord = this.data.Discord.split('~');
      this.Whatsapp = this.data.Whatsapp.split('~');
      this.Skype = this.data.Skype.split('~');
      this.Telegram = this.data.Telegram.split('~');
      this.Twitch = this.data.Twitch.split('~');

      //

      this.filterLink();

      this.getSocials();

      this.preloadSocials();
      this.preloadContact();
      this.preloadEmail();
      this.preloadWebsites();
      this.preloadAddresses();
      this.preloadYoutubeLinks();
    
      this.preloadLinks();
      this.preloadImages();

      this.filterSocials();

      this.isPreLoading = false;

      this.availableSocials.forEach(social => {
        console.log(this[social]);
      });
    })
    .catch((error) => {
      console.log(error);
      this.isPreLoading = false;
      this.showNotification("Error loading card data.");
    })
  }

  showNotification(notifText:string) {
    var notifTextArea = document.getElementById('notifText').innerHTML = '&nbsp;&nbsp;' + notifText;
    var notificationOverlay = document.getElementById('notificationOverlay');
    notificationOverlay.classList.remove('hidden');
    setTimeout(function() {
      var notificationOverlay = document.getElementById('notificationOverlay');
      notificationOverlay.classList.add('hidden');
    }, 5000);
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

        var block = document.getElementById('contactGroup' + count.toString());
        block.classList.remove('hidden');
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
        var sanitized = this.getSafeUrl(newL);
        this.finalLinks.push(sanitized);
        return '';
      } else if (element.includes(this.rawLink2)) {
        var newL = element.replace(this.rawLink2, this.replaceLink2);
        var sanitized = this.getSafeUrl(newL);
        this.finalLinks.push(sanitized);
        return '';
      } else if (element.includes(this.rawLink3)) {
        var newL = element.replace(this.rawLink3, this.replaceLink3);
        var sanitized = this.getSafeUrl(newL);
        this.finalLinks.push(sanitized);
        return '';
      } else {
        var sanitized = this.getSafeUrl(element);
        this.finalLinks.push(sanitized);
        return '';
      }
    });
  }
  
  availableSocials = ['Twitter','Instagram','Linkedin','Facebook','Youtube','Snapchat','Tiktok','Yelp','Discord','Whatsapp','Skype','Telegram','Twitch'];
  
  getSocials() {  
    this.availableSocials.forEach(social => {
      if(this.data[social as keyof typeof this.data] != '') {
        this.socials.push(this.data[social as keyof typeof this.data]);
        this.socalsInUse.push(social);
      }
    });
  }

  preloadLinks() {
    var count:number = 1;

    this.dataLinks.data.forEach(element => {
      if(element.link_title != "") {
        var linkGroupArea = document.getElementById('linkGroup' + count.toString());
        linkGroupArea.classList.remove('hidden');
        var linkTitleArea = document.getElementById('linkLable' + count.toString()) as HTMLInputElement;
        linkTitleArea.value = element.link_title;
        var linkLinkArea = document.getElementById('linkLink' + count.toString()) as HTMLInputElement;
        linkLinkArea.value = element.link;
        
        this.activeLinks.push(element);
        this.totalLinks.push('linkGroup' + count.toString());

        this['linkLogo' + count.toString()] = element.link_logo;
      }

      count++;
    });
  }

  getSocialIndex(socialType:string):number {
    var socialIndex = {
      'Twitter': 0,
      'Instagram': 1,
      'Linkedin': 2,
      'Facebook': 3,
      'Youtube': 4,
      'Snapchat': 5,
      'Tiktok': 6,
      'Twitch': 7,
      'Yelp': 8,
      'Discord': 9,
      'Whatsapp': 10,
      'Skype': 11,
      'Telegram': 12
    }

    return socialIndex[socialType as keyof typeof socialIndex];
  }

  preloadSocials() {
    // Variable of type array to store all available social media types for indexing purpose.
    var availableSocials = ['Twitter','Instagram','Linkedin','Facebook','Youtube','Snapchat','Tiktok','Yelp','Discord','Whatsapp','Skype','Telegram','Twitch'];

    // Variable to store incrementation of forEach loop.
    var count:number = 1;

    // Loop through all the available socials in the card to get active socials.
    availableSocials.forEach(socialName => {
      if(this[socialName].length > 0 && this[socialName][0] != '') {
        this[socialName].forEach(socialLink => {
          var socialGroup = document.getElementById('socialGroup' + count.toString());
          socialGroup.classList.remove('hidden');
          this.totalSocials.push('socialGroup' + count.toString());
          var selector = document.getElementById('social' + count.toString()) as HTMLSelectElement;
          selector.selectedIndex = this.getSocialIndex(socialName);
          var inputField = document.getElementById('socialLink' + count.toString()) as HTMLInputElement;
          inputField.value = socialLink;
          count++;
        });
      }
    });
  }

  preloadEmail() {
    var length = this.emails.length;
    if(this.emails[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;
        var block = document.getElementById('emailGroup' + count.toString());
        block.classList.remove('hidden');
        this.totalEmails.push('emailGroup' + count.toString());
      }
    }
  }

  preloadWebsites() {
    var length = this.websites.length;
    if(this.websites[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;
        var block = document.getElementById('websiteGroup' + count.toString());
        block.classList.remove('hidden');
        this.totalWebsites.push('websiteGroup' + count.toString());
      }
    }
  }

  preloadAddresses() {
    var length = this.addresses.length;
    if(this.addresses[0] != '') {
      for (let i = 0; i < length; i++) {
        var count = i + 1;
        var block = document.getElementById('addressGroup' + count.toString());
        block.classList.remove('hidden');
        this.totalAddresses.push('addressGroup' + count.toString());
      }
    }
  }

  preloadYoutubeLinks() {
    var length = this.youtubeLinks.length;
    if(this.youtubeLinks[0] != '') {
      for(let i = 0; i < length; i++) {
        var count = i + 1;
        var block = document.getElementById('youtubeGroup' + count.toString());
        block.classList.remove('hidden');
        this.totalYoutubeLinks.push('youtubeGroup' + count.toString());
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

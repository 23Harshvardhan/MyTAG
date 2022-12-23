import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { CompressImageService } from '../compress-image.service';
import {take} from 'rxjs/operators'
import { DomSanitizer, provideProtractorTestingSupport } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-admin-card-preview',
  templateUrl: './admin-card-preview.component.html',
  styleUrls: ['./admin-card-preview.component.scss']
})
export class AdminCardPreviewComponent implements OnInit{

  constructor(
    private cookieService:CookieService,
    private activatedRouter:ActivatedRoute,
    private router:Router,
    private compressImage:CompressImageService,
    private sanitizer:DomSanitizer
  ) {}

  // Variable to store recovered cookie from browser for verification purpose.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  getSafeUrl(link:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
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
    "Banner": "",
    "Image": "",
    "Published": "",
    "Created_date": "",
    "Reg_date": "",
    "Status": "",
    "Type": "",
    "Created_by": "",
    "Logo": ""
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Views',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderColor: 'black',
        pointBackgroundColor: 'rgba(0,0,0,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0,00,0.8)',
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
          color: 'rgba(0,0,0,0.3)',
        },
        ticks: {
          color: 'black'
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
  file2:File;
  userId:string;
  formdata = new FormData();
  imageUrl = "http://34.131.186.218/v1/images/default.jpg";
  logoUrl = "http://34.131.186.218/v1/images/default.jpg";

  cpySigBtn() {
    var htmlEditor = document.getElementById('html');
    this.cpySig(htmlEditor.innerHTML);
  }

  cpySig(html) {
    var container = document.createElement('div')
    container.innerHTML = html
    container.style.position = 'fixed'
    container.style.pointerEvents = 'none'
    container.style.opacity = "0";
    document.body.appendChild(container)
    window.getSelection().removeAllRanges()
    var range = document.createRange()
    range.selectNode(container)
    window.getSelection().addRange(range)
    document.execCommand('copy')
    document.body.removeChild(container);
    alert("Copied")
  }

  toggleEditField(field:string) {
    var top = document.getElementById('upperCard');
    top.scrollIntoView({behavior: "smooth"});

    var cardHead = document.getElementById('cardHead');
    var upperCard = document.getElementById('upperCard');
    var cardHeadArea = document.getElementById('cardHeadArea');
    var shareArea = document.getElementById('shareArea');
    var descArea = document.getElementById('descArea');
    var editBtnArea = document.getElementById('editBtnArea');
    var basicContactArea = document.getElementById('basicContactArea');
    var basicDetailArea = document.getElementById('basicDetailArea');
    var videoArea = document.getElementById('videoArea');
    var linksArea = document.getElementById('linksArea');
    var basicContactSection = document.getElementById('basicContactSection');
    var socialDetailSection = document.getElementById('socialDetailSection');
    var socialEditSection = document.getElementById('socialEditSection');
    var basicDetailEditArea = document.getElementById('basicDetailEditArea');
    var videoEditArea = document.getElementById('videoEditArea');
    var linksEditArea = document.getElementById('linksEditArea');
    var secondaryPanel = document.getElementById('secondaryPanel');

    if(field == 'basicDetailArea') {
      upperCard.classList.toggle("hidden");
      shareArea.classList.toggle("hidden");
      descArea.classList.toggle("hidden");
      editBtnArea.classList.toggle("hidden");
      basicContactArea.classList.toggle("hidden");
      cardHead.classList.toggle('hidden');
      basicDetailArea.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      basicContactSection.classList.toggle('hidden');
      socialDetailSection.classList.toggle('hidden');
      basicDetailEditArea.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
    }
    else if(field == 'cardHeadArea') {
      cardHeadArea.classList.toggle("hidden");
      socialDetailSection.classList.toggle("hidden");
      basicContactSection.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
    }
    else if(field == 'socialEditSection') {
      upperCard.classList.toggle("hidden");
      shareArea.classList.toggle("hidden");
      descArea.classList.toggle("hidden");
      editBtnArea.classList.toggle("hidden");
      basicContactArea.classList.toggle("hidden");
      cardHead.classList.toggle('hidden');
      basicDetailArea.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      basicContactSection.classList.toggle('hidden');
      socialDetailSection.classList.toggle('hidden');
      socialEditSection.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
    }
    else if(field == 'videoEditArea') {
      videoEditArea.classList.toggle("hidden");
      upperCard.classList.toggle("hidden");
      shareArea.classList.toggle("hidden");
      descArea.classList.toggle("hidden");
      editBtnArea.classList.toggle("hidden");
      basicContactArea.classList.toggle("hidden");
      cardHead.classList.toggle('hidden');
      basicDetailArea.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      basicContactSection.classList.toggle('hidden');
      socialDetailSection.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
    } else if (field == 'linksEditArea') {
      linksEditArea.classList.toggle('hidden');
      upperCard.classList.toggle("hidden");
      shareArea.classList.toggle("hidden");
      descArea.classList.toggle("hidden");
      editBtnArea.classList.toggle("hidden");
      basicContactArea.classList.toggle("hidden");
      cardHead.classList.toggle('hidden');
      basicDetailArea.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      basicContactSection.classList.toggle('hidden');
      socialDetailSection.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
    }
  }

  areDistinct(arr) {
    let n = arr.length;
    
    let s = new Set();

    for(let i = 0; i < n; i++) {
      s.add(arr[i]);
    }

    return (s.size == arr.length);
  }

  socialGetEvent(block) {
    var category = document.getElementById("social" + block) as HTMLSelectElement;
    var field = document.getElementById("socialLink" + block) as HTMLInputElement;
    var type = category.value;
    this.data[type as keyof typeof this.data] = field.value;
  }

  linkGetEvent(block) {
    var category = document.getElementById("link" + block) as HTMLSelectElement;
    var field = document.getElementById('linkLink' + block) as HTMLInputElement;
    var type = category.value;
    this.data[type as keyof typeof this.data] = field.value;
  }

  getLinkValue(block) {
    var selector = document.getElementById("link" + block) as HTMLSelectElement;
    var fieldValue = this.data[selector.options[selector.selectedIndex].value as keyof typeof this.data];
    var field = document.getElementById('linkLink' + block) as HTMLInputElement;
    field.value = fieldValue;
  }

  getPhones() {
    var count = [];
    var numWithTypes = [];
    var returnGroup:string;

    this.totalContacts.forEach(element => {
      var num = element.replace('contactGroup', '');
      count.push(num);
    });

    count.forEach(element => {
      var inputField = document.getElementById('contact' + element) as HTMLInputElement;
      var contactType = document.getElementById('contactType' + element) as HTMLSelectElement;
      var type = contactType.options[contactType.selectedIndex].value;
      var contactNum = inputField.value;
      numWithTypes.push(type + '?' + contactNum);
    });

    returnGroup = numWithTypes.join(';');
    return returnGroup;
  }

  getEmails() {
    var returnGroup = [];
    var returnJoined;

    this.totalEmails.forEach(element => {
      var count = element.replace("Group", "");
      var inputField = document.getElementById(count) as HTMLInputElement;
      var inputValue = inputField.value;
      if(inputValue.length > 0) {
        returnGroup.push(inputValue);
      }
    });

    returnJoined = returnGroup.join(',');
    return returnJoined.toString();
  }

  getWebsites() {
    var returnGroup = [];
    var returnJoined;

    this.totalWebsites.forEach(element => {
      var count = element.replace("Group", "");
      var inputField = document.getElementById(count) as HTMLInputElement;
      var inputValue = inputField.value;
      if(inputValue.length > 0) {
        returnGroup.push(inputValue);
      }
    });

    returnJoined = returnGroup.join(',');
    return returnJoined.toString();
  }

  getAddresses() {
    var addresses = [];
    var returnAddresses;

    this.totalAddresses.forEach(addressGroup => {
      var count = addressGroup.replace("Group", "");
      var address = document.getElementById(count) as HTMLInputElement;
      var addressVal = address.value;
      if(addressVal.length > 0) {
        addresses.push(addressVal);
      }
    });

    returnAddresses = addresses.join('!');
    return returnAddresses.toString();
  }

  getYoutubeLinks() {
    var returnGroup = [];
    var returnJoined;

    this.totalYoutubeLinks.forEach(element => {
      var count = element.replace("Group", "");
      var inputField = document.getElementById(count) as HTMLInputElement;
      var inputValue = inputField.value;
      if(inputValue.length > 0) {
        returnGroup.push(inputValue);
      }
    });

    returnJoined = returnGroup.join(';');
    return returnJoined.toString();
  }

  activeSocials = [];

  finalizeSocials() {
    var index = [];
    var socials = [];
    var availableSocials = ['Twitter','Instagram','Linkedin','Facebook','Youtube','Snapchat','Tiktok','Yelp','Discord','Whatsapp','Skype','Telegram','Twitch'];

    this.totalSocials.forEach(element => {
      var count = element.replace('socialGroup', '');
      index.push(count);
    });

    index.forEach(element => {
      var selector = document.getElementById('social' + element) as HTMLSelectElement;
      var social = selector.options[selector.selectedIndex].value;
      socials.push(social);
    });

    availableSocials.forEach(element => {
      if(this.data[element as keyof typeof this.data] != '') {
        if(!socials.includes(element)) {
          this.data[element as keyof typeof this.data] = '';
        }
      }
    });
  }

  linksToJson() {
    var count = this.totalLinks.length;

    for(let i = 0; i < count; i++) {
      var num = i + 1;
      var linkTitleArea = document.getElementById('linkLable' + num.toString()) as HTMLInputElement;
      var linkLinkArea = document.getElementById('linkLink' + num.toString()) as HTMLInputElement;
      var linkTitle = linkTitleArea.value;
      var linkLink = linkLinkArea.value;

      this.linksDataJson.data[i].link_title = linkTitle;
      this.linksDataJson.data[i].link = linkLink;
    }

    console.log(this.linksDataJson);
  }

  updateCard(cardId:String, userId:string) {
    this.finalizeSocials();
    this.linksToJson();
    if(this.areDistinct(this.activeSocials)) {
      axios.put('http://34.131.186.218/v1/api/admin/updatecard/update', {CardID: cardId, CardData: {
        "Name": this.data.Name,
        "Job_title": this.data.Job_title,
        "Department": this.data.Department,
        "Company_name": this.data.Company_name,
        "Accreditations": this.data.Accreditations,
        "Headline": this.data.Headline,
        "Email": this.getEmails(),
        "Phone": this.getPhones(),
        "Company_URL": this.getYoutubeLinks(),
        "Link": this.getWebsites(),
        "Address": this.getAddresses(),
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
        "Skype": this.data.Skype,
        "External_links": this.linksDataJson
      }, UserID: userId}, this.cookie)
      .then ((response) => {
        this.uploadImage();
      })
      .catch ((error) => {
        console.log(error);
        alert("There was an error. Please send console log to developer.");
      })
    } else {
      alert("You can't use same social media again!");
    }
  }

  totalSocials = [];
  totalLinks = [];
  totalContacts = [];
  totalEmails = [];
  totalWebsites = [];
  totalAddresses = [];
  totalYoutubeLinks = [];

  addYoutubeLinks() {
    for(let i = 1; i < 4; i++) {
      if(!this.totalYoutubeLinks.includes("youtubeGroup" + i.toString())) {
        var youtubePnl = document.getElementById('youtubeGroup' + i.toString());
        youtubePnl.classList.remove('hidden');
        this.totalYoutubeLinks.push("youtubeGroup" + i.toString());
        break;
      }
    }
  }

  addSocials() {
    for(let i = 1; i < 11; i++) {
      if(!this.totalSocials.includes("socialGroup" + i.toString())) {
        var socialPnl = document.getElementById("socialGroup" + i.toString());
        socialPnl.classList.remove('hidden');
        this.totalSocials.push("socialGroup" + i.toString());
        break;
      }
    }
  }

  addLinks() {
    for(let i = 1; i < 8; i++) {
      if(!this.totalLinks.includes('linkGroup' + i.toString())) {
        var linkPnl = document.getElementById('linkGroup' + i.toString());
        linkPnl.classList.remove('hidden');
        this.totalLinks.push("linkGroup" + i.toString());
        break;
      }
    }
  }

  addContacts() {
    for(let i = 1; i < 8; i++) {
      if(!this.totalContacts.includes('contactGroup' + i.toString())) {
        var contactPnl = document.getElementById('contactGroup' + i.toString());
        contactPnl.classList.remove('hidden');
        this.totalContacts.push('contactGroup' + i.toString());
        break;
      }
    }
  }

  addEmails() {
    for(let i = 1; i < 8; i++) {
      if(!this.totalEmails.includes('emailGroup' + i.toString())) {
        var emailPnl = document.getElementById('emailGroup' + i.toString());
        emailPnl.classList.remove('hidden');
        this.totalEmails.push('emailGroup' + i.toString());
        break;
      }
    }
  }

  addWebsites() {
    for(let i = 1; i < 8; i++) {
      if(!this.totalWebsites.includes('websiteGroup' + i.toString())) {
        var websitePnl = document.getElementById('websiteGroup' + i.toString());
        websitePnl.classList.remove('hidden');
        this.totalWebsites.push('websiteGroup' + i.toString());
        break;
      }
    }
  }

  addAddresses() {
    for(let i = 1; i < 4; i++) {
      if(!this.totalAddresses.includes('addressGroup' + i.toString())) {
        var addressPnl = document.getElementById('addressGroup' + i.toString());
        addressPnl.classList.remove('hidden');
        this.totalAddresses.push('addressGroup' + i.toString());
        break;
      }
    }
  }

  getSocialValue(count:string) {
    var selector = document.getElementById("social" + count) as HTMLSelectElement;
    var fieldValue = this.data[selector.options[selector.selectedIndex].value as keyof typeof this.data];
    var field = document.getElementById('socialLink' + count) as HTMLInputElement;
    field.value = fieldValue;
  }

  removeSocialGroup(count:string) {
    var index = this.totalSocials.indexOf("socialGroup" + count);
    var socialPnl = document.getElementById("socialGroup" + count);
    var link = document.getElementById('socialLink' + count) as HTMLInputElement;
    var selector = document.getElementById('social' + count) as HTMLSelectElement;
    var type = selector.value;
    this.data[type as keyof typeof this.data] = "";
    link.value = "";
    socialPnl.classList.add('hidden');
    this.totalSocials.splice(index, 1);
  }

  removeLinkGroup(count:string) {
    var num:number = parseInt(count);
    var num = num - 1;
    var index = this.totalLinks.indexOf('linkGroup' + count);
    var linkPnl = document.getElementById('linkGroup' + count);
    this.linksDataJson.data[num].link = "";
    this.linksDataJson.data[num].link_title = "";
    this.linksDataJson.data[num].link_logo = "";
    linkPnl.classList.add('hidden');
    this.totalLinks.splice(index, 1);
    console.log(this.linksDataJson);
  }

  removeContactGroup(count: string) {
    var index = this.totalContacts.indexOf('contactGroup' + count);
    var contactPnl = document.getElementById('contactGroup' + count);
    var number = document.getElementById('contact' + count) as HTMLInputElement;
    number.value = "";
    contactPnl.classList.add('hidden');
    this.totalContacts.splice(index, 1);

    console.log(this.totalContacts);
  }

  removeYoutubeGroup(count: string) {
    var index = this.totalYoutubeLinks.indexOf('youtubeGroup' + count);
    var youtubePnl = document.getElementById('youtubeGroup' + count);
    var link = document.getElementById('youtube' + count) as HTMLInputElement;
    link.value = "";
    youtubePnl.classList.add('hidden');
    this.totalYoutubeLinks.splice(index, 1);
  }

  removeEmailGroup(count: string) {
    var index = this.totalEmails.indexOf('emailGroup' + count);
    var emailPnl = document.getElementById('emailGroup' + count);
    var email = document.getElementById('email' + count) as HTMLInputElement;
    email.value = "";
    emailPnl.classList.add('hidden');
    this.totalEmails.splice(index, 1);
  }

  removeWebsiteGroup(count: string) {
    var index = this.totalWebsites.indexOf('websiteGroup' + count);
    var websitePnl = document.getElementById('websiteGroup' + count);
    var website = document.getElementById('website' + count) as HTMLInputElement;
    website.value = "";
    websitePnl.classList.add('hidden');
    this.totalWebsites.splice(index, 1);
  }

  removeAddressGroup(count: string) {
    var index = this.totalAddresses.indexOf('addressGroup' + count);
    var addressPnl = document.getElementById('addressGroup' + count);
    var address = document.getElementById('address' + count) as HTMLInputElement;
    address.value = "";
    addressPnl.classList.add('hidden');
    this.totalAddresses.splice(index, 1);
  }

  compressedImage:File;
  compressedImage2:File;

  imgChangeEvent1;

  cropImagePreview1;

  onFileSelected(event) {
    this.imgChangeEvent1 = event;
  }

  cropImg(e:ImageCroppedEvent) {
    this.cropImagePreview1 = e.base64;
  }

  imgLoad() {
    var cropper = document.getElementById('cropperOverlay');
    cropper.classList.toggle('hidden');
  }

  initCropper() {

  }

  cancelCropper() {
    var cropper = document.getElementById('cropperOverlay');
    cropper.classList.toggle('hidden')
  }

  finalizeCrop() {
    var cropper = document.getElementById('cropperOverlay');
    var reader = new FileReader();

    const url = this.cropImagePreview1;
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
      this.file = new File([blob], "File name",{type: "image/png"});
      reader.readAsDataURL(this.file);
      reader.onload=(event:any) => {
      this.imageUrl = event.target.result;

      this.compressImage.compress(this.file)
      .pipe(take(1))
      .subscribe(compressedFile => {
        this.compressedImage = compressedFile;
      })
      }
    })

    cropper.classList.toggle('hidden');
  }

  imgFailed() {
    alert("Cropper failed to initialize. Please try again.");
  }

  onFileSelected2(event) {
    if(event.target.files.length > 0) {
      this.file2 = event.target.files[0];

      this.compressImage.compress(this.file2)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedImage2 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.file2);
      reader.onload=(event:any) => {
        this.logoUrl = event.target.result;
      }
    }
  }

  rawLink1 = "youtu.be/";
  rawLink2 = "watch?v=";
  rawLink3 = "&feature=youte.be";
  replaceLink1 = "https://www.youtube.com/embed/";
  replaceLink2 = "embed/";
  replaceLink3 = "";

  finalLinks = [];

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

  uploadImage() {
    var formdata = new FormData();
    if(this.compressedImage != null) {
      formdata.append("media", this.compressedImage);

      axios.put('http://34.131.186.218/v1/api/admin/updatecard/updatecardimage?id=' + this.cardID + '&userID=' + this.userId, formdata, this.cookie)
      .then((response) => {
        console.log(response);
        this.uploadLogo();
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating card image. Please send console log to developer.");
      })
    }
    else {
      this.uploadLogo();
    }
  }

  uploadLogo() {
    var formdata = new FormData();
    if(this.compressedImage2 != null) {
      formdata.append("media", this.compressedImage2);

      axios.put('http://34.131.186.218/v1/api/admin/updatecard/updatecardlogo?id=' + this.cardID + '&userID=' + this.userId, formdata, this.cookie)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating card image. Please send console log to developer.");
      })
    }
    else {
      window.location.reload();
    }
  }

  selectField(blockName:string) {
    this.currentBlockName = blockName;
    var inputField = document.getElementById(blockName) as HTMLInputElement;
    this.data[blockName as keyof typeof this.data] = inputField.value;
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
  
  preloadSocials() {
    var lenght = this.socials.length;
    if(this.socials[0] != '') {
      for(let i = 0; i < lenght; i++) {
        var count = i + 1;
        var block = document.getElementById('socialGroup' + count.toString());
        block.classList.remove('hidden');
        this.totalSocials.push('socialGroup' + count.toString());
        var field = document.getElementById('socialLink' + count) as HTMLInputElement;
        field.value = this.socials[i];
        var selector = document.getElementById('social' + count.toString()) as HTMLSelectElement;
        var social = this.socalsInUse[i];
        var index = this.socialIndex[social as keyof typeof this.socialIndex];
        selector.options.selectedIndex = parseInt(index);
      }
    }
  }

  contactTypes = [];
  contactNums = [];

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

  socials = [];
  phoneNumbers = [];
  emails = [];
  websites = [];
  addresses = [];
  youtubeLinks = [];
  
  socalsInUse = [];

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

  getSocials() {
    var availableSocials = ['Twitter','Instagram','Linkedin','Facebook','Youtube','Snapchat','Tiktok','Yelp','Discord','Whatsapp','Skype','Telegram','Twitch'];
    
    availableSocials.forEach(social => {
      if(this.data[social as keyof typeof this.data] != '') {
        this.socials.push(this.data[social as keyof typeof this.data]);
        this.socalsInUse.push(social);
      }
    });
  }

  activeLinks = [];

  preloadLinks() {
    var count:number = 1;
    this.linksDataJson.data.forEach(element => {
      if(element.link != "" && element.link_title != "") {
        var linkGroupArea = document.getElementById('linkGroup' + count.toString());
        linkGroupArea.classList.remove('hidden');
        var linkTitleArea = document.getElementById('linkLable' + count.toString()) as HTMLInputElement;
        linkTitleArea.value = element.link_title;
        var linkLinkArea = document.getElementById('linkLink' + count.toString()) as HTMLInputElement;
        linkLinkArea.value = element.link;
        this.activeLinks.push(element);
      }

      count++;
    });
  }

  getData(cardId:string) {
    axios.get('http://34.131.186.218/v1/api/admin/analytics/getcards?CardID=' + cardId, this.cookie)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data.data[0]
      this.linksDataJson = response.data.data[0].External_links;
      this.loadCardImage();

      this.userId = this.data.UserID;

      this.phoneNumbers = this.data.Phone.split(';');
      this.emails = this.data.Email.split(',');
      this.websites = this.data.Link.split(',');
      this.addresses = this.data.Address.split('!');
      this.youtubeLinks = this.data.Company_URL.split(';');

      this.filterLink();

      this.getSocials();

      this.preloadSocials();
      this.preloadContact();
      this.preloadEmail();
      this.preloadWebsites();
      this.preloadAddresses();
      this.preloadYoutubeLinks();

      this.preloadLinks();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error! Please send console log to developer.");
    })
  }

  redirectSocial(block:string) {
    var url = this.data[block as keyof typeof this.data];
    if(url.startsWith("https://")) {
      window.open(url, "_blank");
    } else {
      window.open("https://" + url, "_blank");
    }
  }

  openLink(link:string) {
    if(link.startsWith("https:///")) {
      window.open(link, "_blank");
    } else {
      window.open("https://" + link, "_blank");
    }
  }

  test() {
    alert('Working');
  }

  loadCardImage() {
    if(this.data.Banner != "" || this.data.Banner != null) {
      this.imageUrl = "http://34.131.186.218/v1/" + this.data.Banner;
    }

    if(this.data.Logo != "" || this.data.Logo != null) {
      this.logoUrl = "http://34.131.186.218/v1/" + this.data.Logo;
    }
  }

}
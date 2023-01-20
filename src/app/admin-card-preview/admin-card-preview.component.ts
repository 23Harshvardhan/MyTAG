import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CompressImageService } from '../compress-image.service';
import { elementAt, take} from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http'
import axios from 'axios';
import { Observable } from 'rxjs';

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
    private sanitizer:DomSanitizer,
    private http:HttpClient
  ) {}

  // Variable to store recovered cookie from browser for verification purpose.
  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  // Function to take URL and bypass it for security trust reasons and return it.
  getSafeUrl(link:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  // Variable to store the API url. This will be called during every API request.
  APIurl:string = "http://185.208.207.55/v1/";

  // Variable to store current card ID.
  cardID:string;

  // Variable to store card's owner's ID.
  userId:string;
  
  // Variable to store card image url.
  cardImg:string;

  // Variable to store mime of type JPEG for conversion purpose.
  mime:string = "image/jpeg";

  // Variable to store file name for images. This will be used while uploading images to server via API.
  fileName:string = "image.jpg";

  // Variable to store link of default logo.
  defaultLogo:string = "";

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

  // Variable of type boolean to keep track of loading status
  isPreLoading:boolean = true;

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

  // Variable to store data for QR code.
  cardViewLink:string;

  ngOnInit(): void {
    this.cardID = this.activatedRouter.snapshot.paramMap.get('id');
    this.getData(this.cardID);
    this.cardViewLink = "http://185.208.207.55:4200/viewCard/" + this.cardID;
  }

  currentBlockName:string;
  file:File;
  file2:File;
  formdata = new FormData();
  imageUrl = "http://185.208.207.55/v1/banners/default.jpg";
  logoUrl = "http://185.208.207.55/v1/banners/default.jpg";

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
    this.showNotification("Copied!");
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
    var nameDetailsPnl = document.getElementById('editFooter');
    var imageEditArea = document.getElementById('imageEditArea');
    var imageArea = document.getElementById('imageArea');

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
      imageArea.classList.toggle('hidden');
    }
    else if(field == 'cardHeadArea') {
      cardHeadArea.classList.toggle("hidden");
      socialDetailSection.classList.toggle("hidden");
      basicContactSection.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
      imageArea.classList.toggle('hidden');
      nameDetailsPnl.focus();
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
      imageArea.classList.toggle('hidden');
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
      imageArea.classList.toggle('hidden');
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
      imageArea.classList.toggle('hidden');
      basicContactArea.classList.toggle("hidden");
      cardHead.classList.toggle('hidden');
      basicDetailArea.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      basicContactSection.classList.toggle('hidden');
      socialDetailSection.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
    } else if (field == 'imageEditArea') {
      upperCard.classList.toggle("hidden");
      shareArea.classList.toggle("hidden");
      descArea.classList.toggle("hidden");
      imageArea.classList.toggle('hidden');
      editBtnArea.classList.toggle("hidden");
      basicContactArea.classList.toggle("hidden");
      cardHead.classList.toggle('hidden');
      basicDetailArea.classList.toggle('hidden');
      videoArea.classList.toggle('hidden');
      linksArea.classList.toggle('hidden');
      basicContactSection.classList.toggle('hidden');
      socialDetailSection.classList.toggle('hidden');
      secondaryPanel.classList.toggle('hidden');
      imageEditArea.classList.toggle('hidden');
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

  // socialGetEvent(block) {
  //   var category = document.getElementById("social" + block) as HTMLSelectElement;
  //   var field = document.getElementById("socialLink" + block) as HTMLInputElement;
  //   var type = category.value;
  //   this[type].push(field.value);
  // }

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
    // Variable to keep track of indexes of all the social media groups.
    var index = [];

    // Looping through all the occupied social media groups to get their indexes.
    this.totalSocials.forEach(element => {
      var count = element.replace('socialGroup', '');
      index.push(count);
    });

    // Looping through the indexes to get and store the selected social media types.
    index.forEach(element => {
      var selector = document.getElementById('social' + element) as HTMLSelectElement;
      var social = selector.options[selector.selectedIndex].value;
      var linkField = document.getElementById('socialLink' + element) as HTMLInputElement;
      var link = linkField.value;
      this[social].push(link);
      // socials.push(social);
    });

    var twitterData = this.Twitter.join('~');
    this.data.Twitter = twitterData;
    var instagramData = this.Instagram.join('~');
    this.data.Instagram = instagramData;
    var linkedinData = this.Linkedin.join('~');
    this.data.Linkedin = linkedinData;
    var facebookData = this.Facebook.join('~');
    this.data.Facebook = facebookData;
    var youtubeData = this.Youtube.join('~');
    this.data.Youtube = youtubeData;
    var snapchatData = this.Snapchat.join('~');
    this.data.Snapchat = snapchatData;
    var tiktokData = this.Tiktok.join('~');
    this.data.Tiktok = tiktokData;
    var yelpData = this.Yelp.join('~');
    this.data.Yelp = yelpData;
    var discordData = this.Discord.join('~');
    this.data.Discord = discordData;
    var whatsappData = this.Whatsapp.join('~');
    this.data.Whatsapp = whatsappData;
    var skypeData = this.Skype.join('~');
    this.data.Skype = skypeData;
    var telegramData = this.Telegram.join('~');
    this.data.Telegram = telegramData;
    var twitchData = this.Twitch.join('~');
    this.data.Twitch = twitchData;

    // availableSocials.forEach(element => {
    //   console.log(this.data[element]);
    //   // if(allSocialValues[element] != "") {
    //   //   this.data[element] = allSocialValues[element];
    //   // }
    // });

    // availableSocials.forEach(element => {
    //   if(this.data[element as keyof typeof this.data] != '') {
    //     if(!socials.includes(element)) {
    //       this.data[element as keyof typeof this.data] = '';
    //     }
    //   }
    // });
  }

  linkLogo1:File;
  compressedLogo1:File;
  linkLogoUrl1 = "http://185.208.207.55/v1/link_logos/0000002_1.jpg";
  linkLogo2:File;
  compressedLogo2:File;
  linkLogoUrl2 = "http://185.208.207.55/v1/link_logos/0000002_2.jpg";
  linkLogo3:File;
  compressedLogo3:File;
  linkLogoUrl3 = "http://185.208.207.55/v1/link_logos/0000002_3.jpg";
  linkLogo4:File;
  compressedLogo4:File;
  linkLogoUrl4 = "http://185.208.207.55/v1/link_logos/0000002_4.jpg";
  linkLogo5:File;
  compressedLogo5:File;
  linkLogoUrl5 = "http://185.208.207.55/v1/link_logos/0000002_5.jpg";
  linkLogo6:File;
  compressedLogo6:File;
  linkLogoUrl6 = "http://185.208.207.55/v1/link_logos/0000002_6.jpg";
  linkLogo7:File;
  compressedLogo7:File;
  linkLogoUrl7 = "http://185.208.207.55/v1/link_logos/0000002_7.jpg";

  cardImageB641;
  cardImageB642;
  cardImageB643;
  cardImage1;
  cardImage2;
  cardImage3;
  cardImageCompressed1;
  cardImageCompressed2;
  cardImageCompressed3;

  downloadImage(url:string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }  

  async getFile(imageUrl:string): Promise<File> {
    const blob = await this.downloadImage(imageUrl).toPromise();
    const fileToReturn = new File([blob], 'image.jpg', {type: blob.type});
    console.log(fileToReturn.size);
    return fileToReturn;
  }

  imageUpload1(event) {
    if(event.target.files.length > 0) {
      this.cardImage1 = event.target.files[0];

      this.compressImage.compress(this.cardImage1)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.cardImageCompressed1 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.cardImage1);
      reader.onload=(event:any) => {
        var imgHolder = document.getElementById('imageHolder1') as HTMLImageElement;
        imgHolder.src = event.target.result;
      }
    }
  }

  imageUpload2(event) {
    if(event.target.files.length > 0) {
      this.cardImage2 = event.target.files[0];

      this.compressImage.compress(this.cardImage2)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.cardImageCompressed2 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.cardImage2);
      reader.onload=(event:any) => {
        var imgHolder = document.getElementById('imageHolder2') as HTMLImageElement;
        imgHolder.src = event.target.result;
      }
    }
  }

  imageUpload3(event) {
    if(event.target.files.length > 0) {
      this.cardImage3 = event.target.files[0];

      this.compressImage.compress(this.cardImage3)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.cardImageCompressed3 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.cardImage3);
      reader.onload=(event:any) => {
        var imgHolder = document.getElementById('imageHolder3') as HTMLImageElement;
        imgHolder.src = event.target.result;
      }
    }
  }

  logoUpload1(event) {
    if(event.target.files.length > 0) {
      this.linkLogo1 = event.target.files[0];

      this.compressImage.compress(this.linkLogo1)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo1 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo1);
      reader.onload=(event:any) => {
        this.linkLogoUrl1 = event.target.result;
      }
    }
  }

  logoUpload2(event) {
    if(event.target.files.length > 0) {
      this.linkLogo2 = event.target.files[0];

      this.compressImage.compress(this.linkLogo2)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo2 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo2);
      reader.onload=(event:any) => {
        this.linkLogoUrl2 = event.target.result;
      }
    }
  }

  logoUpload3(event) {
    if(event.target.files.length > 0) {
      this.linkLogo3 = event.target.files[0];

      this.compressImage.compress(this.linkLogo3)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo3 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo3);
      reader.onload=(event:any) => {
        this.linkLogoUrl3 = event.target.result;
      }
    }
  }

  logoUpload4(event) {
    if(event.target.files.length > 0) {
      this.linkLogo4 = event.target.files[0];

      this.compressImage.compress(this.linkLogo4)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo4 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo4);
      reader.onload=(event:any) => {
        this.linkLogoUrl4 = event.target.result;
      }
    }
  }

  openUpload(count:number) {
    var upload = document.getElementById('linkLogoUpload' + count.toString());
    upload.click();
  }

  openImageUpload(count:number) {
    var upload = document.getElementById('imageUpload' + count.toString());
    upload.click();
  }

  logoUpload5(event) {
    if(event.target.files.length > 0) {
      this.linkLogo5 = event.target.files[0];

      this.compressImage.compress(this.linkLogo5)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo5 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo5);
      reader.onload=(event:any) => {
        this.linkLogoUrl5 = event.target.result;
      }
    }
  }

  logoUpload6(event) {
    if(event.target.files.length > 0) {
      this.linkLogo6 = event.target.files[0];

      this.compressImage.compress(this.linkLogo6)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo6 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo6);
      reader.onload=(event:any) => {
        this.linkLogoUrl6 = event.target.result;
      }
    }
  }

  logoUpload7(event) {
    if(event.target.files.length > 0) {
      this.linkLogo7 = event.target.files[0];

      this.compressImage.compress(this.linkLogo7)
      .pipe(take(1))
      .subscribe(compressedFile2 => {
        this.compressedLogo7 = compressedFile2;
      })

      var reader = new FileReader();

      reader.readAsDataURL(this.linkLogo7);
      reader.onload=(event:any) => {
        this.linkLogoUrl7 = event.target.result;
      }
    }
  }

  updateLinkLogos() {
    var formdata = new FormData();
    if(this.compressedLogo1 != null) {
      formdata.append('', this.compressedLogo1);
      this.dataLinks.data[0].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_1.jpg'; 
    }

    if(this.compressedLogo2 != null) {
      formdata.append('', this.compressedLogo2);
      this.dataLinks.data[1].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_2.jpg'; 
    }

    if(this.compressedLogo3 != null) {
      formdata.append('', this.compressedLogo3);
      this.dataLinks.data[2].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_3.jpg'; 
    }

    if(this.compressedLogo4 != null) {
      formdata.append('', this.compressedLogo4);
      this.dataLinks.data[3].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_4.jpg'; 
    }

    if(this.compressedLogo5 != null) {
      formdata.append('', this.compressedLogo5);
      this.dataLinks.data[4].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_5.jpg'; 
    }

    if(this.compressedLogo6 != null) {
      formdata.append('', this.compressedLogo6);
      this.dataLinks.data[5].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_6.jpg'; 
    }

    if(this.compressedLogo7 != null) {
      formdata.append('', this.compressedLogo7);
      this.dataLinks.data[6].link_logo = 'http://185.208.207.55/v1/link_logos/' + this.cardID + '_7.jpg'; 
    }

    axios.put('http://185.208.207.55/v1/api/admin/updatecard/updatelinklogo?id=' + this.cardID + '&userID=' + this.data.UserID, formdata, this.cookie)
    .then((response) => {})
    .catch((error) => {
      console.log(error);
      alert("There was a problem updating link logos. Please send console log to developer.");
    });
  }

  imageLinks = [];
  imageLink1;
  imageLink2;
  imageLink3;

  updateCardImages() {
    this.isPreLoading = true;

    var formdata = new FormData();

    if(this.cardImageCompressed1 != null) {
      formdata.append('1', this.cardImageCompressed1);
      if(!this.dataImages.data.includes('http://185.208.207.55/v1/card_images/' + this.cardID + '_1.jpg')) {
        this.dataImages.data.push('http://185.208.207.55/v1/card_images/' + this.cardID + '_1.jpg');
      }
    } else if (this.dataImages.data.includes('http://185.208.207.55/v1/card_images/' + this.cardID + '_1.jpg')) {
      var index = this.dataImages.data.indexOf('http://185.208.207.55/v1/card_images/' + this.cardID + '_1.jpg');
      this.dataImages.data.splice(index, 1);
    }

    if(this.cardImageCompressed2 != null) {
      formdata.append('2', this.cardImageCompressed2);
      if(!this.dataImages.data.includes('http://185.208.207.55/v1/card_images/' + this.cardID + '_2.jpg')) {
        this.dataImages.data.push('http://185.208.207.55/v1/card_images/' + this.cardID + '_2.jpg');
      }
    }

    if(this.cardImageCompressed3 != null) {
      formdata.append('3', this.cardImageCompressed3);
      if(!this.dataImages.data.includes('http://185.208.207.55/v1/card_images/' + this.cardID + '_3.jpg')) {
        this.dataImages.data.push('http://185.208.207.55/v1/card_images/' + this.cardID + '_3.jpg');
      }
    }

    axios.put('http://185.208.207.55/v1/api/admin/updatecard/updatecardimage?id=' + this.cardID + '&userID=' + this.data.UserID, formdata, this.cookie)
    .then((response) => {
      this.updateCard(this.cardID, this.data.UserID);
    })
    .catch((error) => {
      console.log(error);
      this.showNotification("There was a problem updating images.");
    });
  }

  imagesToShow = [];

  updateCard(cardId:String, userId:string) {
    this.isPreLoading = true;
    this.finalizeSocials();
    this.updateLinkLogos();
    if(this.areDistinct(this.activeSocials)) {
      axios.put('http://185.208.207.55/v1/api/admin/updatecard/update', {CardID: cardId, CardData: {
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
        "External_links": this.dataLinks,
        "Images": this.dataImages
      }, UserID: userId}, this.cookie)
      .then ((response) => {
        this.uploadImage();
      })
      .catch ((error) => {
        console.log(error);
        this.showNotification("There was an error.");
      })
    } else {
      this.showNotification("You can't use same social media again!");
    }
  }

  totalSocials = [];
  totalLinks = [];
  totalContacts = [];
  totalEmails = [];
  totalWebsites = [];
  totalAddresses = [];
  totalYoutubeLinks = [];
  totalImages = [];

  addImage() {
    for(let i = 1; i < 4; i++) {
      if(!this.totalImages.includes("imageGroup" + i.toString())) {
        var imagePnl = document.getElementById('imageGroup' + i.toString());
        imagePnl.classList.remove('hidden');
        this.totalImages.push('imageGroup' + i.toString());
        break;
      }
    }
  }

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
    field.value = '';
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
    var linkLinkArea = document.getElementById('linkLink' + count) as HTMLInputElement;
    linkLinkArea.value = "";
    var linkTitleArea = document.getElementById('linkLable' + count) as HTMLInputElement;
    linkTitleArea.value = "";

    this.dataLinks.data[num].link = "";
    this.dataLinks.data[num].link_logo = this.defaultLogo;
    this.dataLinks.data[num].link_title = "";

    linkPnl.classList.add('hidden');
    this.totalLinks.splice(index, 1);
  }

  removeContactGroup(count: string) {
    var index = this.totalContacts.indexOf('contactGroup' + count);
    var contactPnl = document.getElementById('contactGroup' + count);
    var number = document.getElementById('contact' + count) as HTMLInputElement;
    number.value = "";
    contactPnl.classList.add('hidden');
    this.totalContacts.splice(index, 1);
  }

  removeImageGroup(count: string) {
    var index = this.totalImages.indexOf('imageGroup' + count);
    var pnl = document.getElementById('imageGroup' + count);
    pnl.classList.add('hidden');
    this.totalImages.splice(index, 1);
    this['cardImage' + count] = null;
    this['cardImageCompressed' + count] = null;
    var imageLinkIndex = this.dataImages.data.indexOf('http://185.208.207.55/v1/card_images/' + this.cardID + '_' + count + '.jpg');
    this.dataImages.data.splice(imageLinkIndex, 1);
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
  replaceLink1 = "youtube.com/embed/";
  replaceLink2 = "embed/";
  replaceLink3 = "";

  finalLinks = [];

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

  uploadImage() {
    var formdata = new FormData();
    if(this.compressedImage != null) {
      formdata.append("media", this.compressedImage);

      axios.put('http://185.208.207.55/v1/api/admin/updatecard/updatecardbanner?id=' + this.cardID + '&userID=' + this.data.UserID, formdata, this.cookie)
      .then((response) => {
        this.uploadLogo();
      })
      .catch((error) => {
        console.log(error);
        this.showNotification("There was an error updating card image.");
      })
    }
    else {
      this.uploadLogo();
    }
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
  
  goToQrCode() {
    var qrArea = document.getElementById('qrPanel');
    qrArea.scrollIntoView({behavior:'smooth'});
  }

  uploadLogo() {
    var formdata = new FormData();
    if(this.compressedImage2 != null) {
      formdata.append("media", this.compressedImage2);

      axios.put('http://185.208.207.55/v1/api/admin/updatecard/updatecardlogo?id=' + this.cardID + '&userID=' + this.data.UserID, formdata, this.cookie)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        this.showNotification("There was an error updating card image.");
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

  // Keeps track of indexing of all the socials.
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
  
  // This function looks though all the socials in use and accordingly unhides editor panel and puts value.
  preloadSocials() {
    // Variable of type array to store all available social media types for indexing purpose.
    var availableSocials = ['Twitter','Instagram','Linkedin','Facebook','Youtube','Snapchat','Tiktok','Yelp','Discord','Whatsapp','Skype','Telegram','Twitch'];

    

    // // Variable to keep track of all active socials.
    // var socials = [];

    // // Variable to store incrementation of forEach loop.
    // var count:number = 1;

    // // Loop through all the available socials in the card to get active socials.
    // availableSocials.forEach(element => {
    //   if(this[element] != '') {
    //     socials.push(element);
    //   }
    // });

    // socials.forEach(element => {
    //   console.log(element);
    //   // if(this[element].lenght > 1) {
    //   //   var lenght:number = this[element].lenght;

    //   //   for(let i=0; i<lenght;i++) {
    //   //     var socialGroup = document.getElementById('socialGroup' + count.toString());
    //   //     socialGroup.classList.remove('hidden');
    //   //     var selector = document.getElementById('social' + count.toString()) as HTMLSelectElement;
    //   //     selector.selectedIndex = parseInt(this.socialIndex[element as keyof typeof this.socialIndex]);
    //   //     var inputField = document.getElementById("socialLink" + count.toString()) as HTMLInputElement;
    //   //     inputField.value = this[element][i];
    //   //     count++;
    //   //   }
    //   // } else {
    //   //   var socialGroup = document.getElementById('socialGroup' + count.toString());
    //   //   socialGroup.classList.remove('hidden');
    //   //   var selector = document.getElementById('social' + count.toString()) as HTMLSelectElement;
    //   //   selector.selectedIndex = parseInt(this.socialIndex[element as keyof typeof this.socialIndex]);
    //   //   var inputField = document.getElementById("socialLink" + count.toString()) as HTMLInputElement;
    //   //   inputField.value = this[element][0];
    //   //   count++;
    //   // }
    // });

    // // var lenght = this.socials.length;
    // // if(this.socials[0] != '') {
    // //   for(let i = 0; i < lenght; i++) {
    // //     var count = i + 1;
    // //     var block = document.getElementById('socialGroup' + count.toString()); // Entire social editor block.
    // //     block.classList.remove('hidden');
    // //     this.totalSocials.push('socialGroup' + count.toString()); // Total socials keeps track of all the active social blocks.
    // //     var field = document.getElementById('socialLink' + count) as HTMLInputElement; // Text field where user puts his social data.
    // //     field.value = this.socials[i];
    // //     var selector = document.getElementById('social' + count.toString()) as HTMLSelectElement; // Selector which the user uses to select which data he is selecting.
    // //     var social = this.socalsInUse[i];
    // //     var index = this.socialIndex[social as keyof typeof this.socialIndex];
    // //     selector.options.selectedIndex = parseInt(index);
    // //   }
    // // }
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
  images = []; 
  socalsInUse = [];

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

    this.dataLinks.data.forEach(element => {
      if(element.link_title != "") {
        var linkGroupArea = document.getElementById('linkGroup' + count.toString());
        linkGroupArea.classList.remove('hidden');
        var linkTitleArea = document.getElementById('linkLable' + count.toString()) as HTMLInputElement;
        linkTitleArea.value = element.link_title;
        var linkLinkArea = document.getElementById('linkLink' + count.toString()) as HTMLInputElement;
        linkLinkArea.value = element.link;
        
        // var dataSet = {
        //   "link_logo": "http://185.208.207.55/v1/link_logos/" + this.cardID + "_" + count.toString() + ".jpg",
        //   "link": element.link,
        //   "link_title": element.link_title
        // }
        // this.dataToSendJson.data.push(dataSet);
        this.activeLinks.push(element);
        this.totalLinks.push('linkGroup' + count.toString());

        this['linkLogo' + count.toString()] = element.link_logo;
      }

      count++;
    });
  }

  activeImages = [];

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

  UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
      return true;
    else
      return false;
  }

  splitImages() {
    this.dataImages.data.forEach(element => {
      if(this.UrlExists(element)) {
        this.imagesToShow.push(element);
      }
    })
  }

  storeImages() {
    var count:number = 1;
    this.imagesToShow.forEach(element => {
      this['cardImage' + count] = this.getFile(element);
      this['cardImageCompressed' + count] = this.getFile(element);

      count++;
    });
  }

  getData(cardId:string) {
    axios.get('http://185.208.207.55/v1/api/admin/analytics/getcards?CardID=' + cardId, this.cookie)
    .then ((response) => {
      //Store the card data in data variable to be accessed from front end.
      this.data = response.data.data[0]
      this.dataLinks = response.data.data[0].External_links;
      this.dataImages = response.data.data[0].Images;
      
      this.userId = this.data.UserID;

      this.splitImages();
      this.loadCardImage();

      this.phoneNumbers = this.data.Phone.split(';');
      this.emails = this.data.Email.split(',');
      this.websites = this.data.Link.split(',');
      this.addresses = this.data.Address.split('!');
      this.youtubeLinks = this.data.Company_URL.split(';');
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

      this.isPreLoading = false;
    })
    .catch((error) => {
      console.log(error);
      this.isPreLoading = false;
      this.showNotification("Error loading card data.");
    })
  }

  redirectSocial(block:string) {
    try {
      var url = block;
      if(url.startsWith("https://")) {
        window.open(url, "_blank");
      } else {
        window.open("https://" + url, "_blank");
      }
    } catch {
      this.showNotification("Link is invalid. Please fix link.");
    }
  }

  openLink(link:string) {
    if(link.startsWith("https://")) {
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
      this.imageUrl = "http://185.208.207.55/v1/" + this.data.Banner;
    }

    if(this.data.Logo != "" || this.data.Logo != null) {
      this.logoUrl = "http://185.208.207.55/v1/" + this.data.Logo;
    }
  }
}
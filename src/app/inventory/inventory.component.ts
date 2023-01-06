import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(
    private router:Router,
    private cookieService:CookieService
  ) { }

  cookie = {
    headers:{
      cki: this.cookieService.get("jwt")
    } 
  }

  responseData = [];

  isPreLoading:boolean = true;

  ngOnInit(): void {
    this.checkAuth();
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }

  checkAuth() {
    axios.get('http://185.208.207.55/v1/api/admin', this.cookie).
    then((response) => {
      this.loadData();
    })
    .catch((error) => {
      console.log(error);
      this.router.navigate(['/']);
    });
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

  showAlert(alertTitle:string, alertContent:string, alertButton:string) {
    var alertTitleArea = document.getElementById('alertTitle').innerHTML = alertTitle;
    var alertContentArea = document.getElementById('alertContent').innerHTML = alertContent;
    var alertButtonArea = document.getElementById('alertButton').innerHTML = alertButton;
    var alertBox = document.getElementById('alertBoxOverlay');
    alertBox.classList.remove('hidden');
  }

  hideAlert() {
    var alertBox = document.getElementById('alertBoxOverlay');
    alertBox.classList.add('hidden');
  }

  emails = [];

  loadData() {
    axios.get('http://185.208.207.55/v1/api/admin/analytics/getcards', this.cookie)
    .then((response) => {
      this.responseData = response.data.data;
      this.isPreLoading = false;
    })
    .catch((error) => {
      this.isPreLoading = false;
      console.log(error);
      this.showNotification("There was a problem loading data.");
    });
  }

  addCards() {
    var qtyField = document.getElementById("qty") as HTMLInputElement;
    var qty = qtyField.value;

    if(parseInt(qty) > 0) {
      axios.post('http://185.208.207.55/v1/api/admin/updatecard/bulkadd', {"amount": qty}, this.cookie)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("There was a problem creating card. Please try again later.");
      });
    }
  }

  viewCard(CardID:string, CardStatus:string) {
    if(CardStatus == "active") {
      this.router.navigate(['/adminCardPreview/' + CardID]);
    } else if (CardStatus == "pending") {
      this.showAlert("Warning", "This card is not alloted to a user yet. Editing this card is not possible as a valid account ID is required while editing.", "Okay");
    }
  }

  openLink(link:string) {
    window.open('http://185.208.207.55:4200/viewCard/' + link);
  }
}

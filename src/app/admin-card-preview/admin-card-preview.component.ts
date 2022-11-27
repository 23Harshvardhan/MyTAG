import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-card-preview',
  templateUrl: './admin-card-preview.component.html',
  styleUrls: ['./admin-card-preview.component.scss']
})
export class AdminCardPreviewComponent implements OnInit{

  constructor(
    private cookieService:CookieService,
    private activatedRouter:ActivatedRoute
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

  ngOnInit(): void {
    this.cardID = this.activatedRouter.snapshot.paramMap.get('id');
    this.getCardData();
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }

  getCardData() {
    axios.get(this.APIurl + "api/admin/analytics/getcards?CardID=" + this.cardID, this.cookie)
    .then((response) => {
      console.log(response.data.data[0]);
      this.cardImg = this.APIurl + response.data.data[0].Image;
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error. Please check console log.");
    });
  }

}

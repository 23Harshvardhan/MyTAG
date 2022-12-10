import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-vert-navbar',
  templateUrl: './admin-vert-navbar.component.html',
  styleUrls: ['./admin-vert-navbar.component.scss']
})
export class AdminVertNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.fetchDate();
  }

  fetchDate() {
    var dateField = document.getElementById("dateField");
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var monthNum = currentDate.getMonth() + 1;
    var month;
    var day = currentDate.getDate();

    switch(monthNum) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        month = "";
        break;
    }

    dateField.innerText = day + " " + month + " " + year.toString();
  }
}

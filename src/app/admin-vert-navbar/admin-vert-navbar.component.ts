import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-vert-navbar',
  templateUrl: './admin-vert-navbar.component.html',
  styleUrls: ['./admin-vert-navbar.component.scss']
})
export class AdminVertNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.fetchDate();
  }

  fetchDate() {
    var dateField = document.getElementById("dateField");
    var currentDate = new Date();
    dateField.innerText = currentDate.toDateString();
  }
}

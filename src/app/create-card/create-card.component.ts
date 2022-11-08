import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openTab() {
    
  }

  name:string = "";
  designation:string = "";

  getNameValue(val:string) {
    this.name = val;
  }

  getDesignationValue(val:string) {
    this.designation = val;
  }

  showNameInput() {
    var inputWind = document.getElementById("nameInput");
    inputWind!.style.display = "block";
  }

  showDesignationInput() {
    var inputWind = document.getElementById("designationInput");
    inputWind!.style.display = "block";
  }

  saveNameInput() {
    var inputWind = document.getElementById("nameInput");
    inputWind!.style.display = "none";
  }

  saveDesignationInput() {
    var inputWind = document.getElementById("designationInput");
    inputWind!.style.display = "none";
  }
}
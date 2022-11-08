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

  currentBlockName = "";
  accreds:string[] = [];

  data = {
    name: "",
    designation: "",
    companyName: "",
    accreditations: ""
  }

  showInputWind(blockName:string) {
    this.currentBlockName = blockName;
    var inputWind = document.getElementById("inputWind");
    const warning = document.getElementById("warning");
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    inputWind!.style.display = "block";
    var temp = this.data[blockName as keyof typeof this.data];
    inputArea.value = temp;

    if(this.currentBlockName == "accreditations") {
      warning!.style.display = "block";
    }
    else{
      warning!.style.display = "none";
    }
  }

  closeWind() {
    var inputWind = document.getElementById("inputWind");
    const inputArea = document.getElementById("textArea") as HTMLInputElement;
    var temp = inputArea.value;
    this.data[this.currentBlockName as keyof typeof this.data] = temp;
    inputWind!.style.display = "none";

    if(this.currentBlockName == "accreditations") {
      if(temp != ""){
        this.accreds = inputArea.value.split(',');
      }
    }
  }

  // openTab() {
    
  // }

  // name:string = "";
  // designation:string = "";

  // getNameValue(val:string) {
  //   this.name = val;
  // }

  // getDesignationValue(val:string) {
  //   this.designation = val;
  // }

  // showNameInput() {
  //   var inputWind = document.getElementById("nameInput");
  //   inputWind!.style.display = "block";
  // }

  // showDesignationInput() {
  //   var inputWind = document.getElementById("designationInput");
  //   inputWind!.style.display = "block";
  // }

  // saveNameInput() {
  //   var inputWind = document.getElementById("nameInput");
  //   inputWind!.style.display = "none";
  // }

  // saveDesignationInput() {
  //   var inputWind = document.getElementById("designationInput");
  //   inputWind!.style.display = "none";
  // }
}
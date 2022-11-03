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

  showName(idName:string) {
    var input = document.getElementById(idName);
    
    if(input != null) {
      var visibilityState = document.getElementById(idName)?.style.display;

      if(visibilityState == "none") {
        input.style.display = "block";
      }
      else {
        input.style.display = "none";
      }
    }
  }
}
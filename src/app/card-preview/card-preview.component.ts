import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  generatedCardId:any;

  constructor() { 
    this.generatedCardId = "123812763";
  }

  ngOnInit(): void {
  }
}
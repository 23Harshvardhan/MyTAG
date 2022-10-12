import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onHome(){
    document.getElementById("home-section")?.scrollIntoView({behavior: 'smooth'});
  }

  onFeatures(){
    document.getElementById("features-section")?.scrollIntoView({behavior: 'smooth'});
  }

  onDemo(){
    document.getElementById("demo-section")?.scrollIntoView({behavior: 'smooth'});
  }

  onPricing(){
    document.getElementById("pricing-section")?.scrollIntoView({behavior: 'smooth'});
  }

}

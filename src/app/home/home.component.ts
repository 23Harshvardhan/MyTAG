import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  onContactUs(){
    document.getElementById("contact-section")?.scrollIntoView({behavior:'smooth'});
  }

  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }
}

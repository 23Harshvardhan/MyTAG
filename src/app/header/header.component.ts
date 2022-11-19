import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  

  expandNav() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");
    
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    hamburger.classList.toggle("toggle");
  }

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
}

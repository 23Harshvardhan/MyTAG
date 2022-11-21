import { Component } from '@angular/core';

@Component({
  selector: 'app-active-cards',
  templateUrl: './active-cards.component.html',
  styleUrls: ['./active-cards.component.scss']
})
export class ActiveCardsComponent {
  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }
}

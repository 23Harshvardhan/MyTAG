import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  toggleNav() {
    var toggle = document.getElementById("toggle");
    var overlay = document.getElementById("overlay");
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
  }
}

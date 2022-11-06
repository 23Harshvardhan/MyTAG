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

  showPersonalInfoTab() {
    document.getElementById("personalInfoTab")?.classList.toggle("hidden");
  }
  
  showBasicInfoTab() {
    document.getElementById("basicInfoTab")?.classList.toggle("hidden");
  }

  showSocialInfoTab() {
    document.getElementById("socialInfoTab")?.classList.toggle("hidden");
  }

  showCommunicationInfoTab() {
    document.getElementById("communicationInfoTab")?.classList.toggle("hidden");
  }

  showBusinessInfoTab() {
    document.getElementById("businessInfoTab")?.classList.toggle("hidden");
  }

  showPaymentInfoTab() {
    document.getElementById("paymentInfoTab")?.classList.toggle("hidden");
  }
}
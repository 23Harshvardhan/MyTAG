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

  data = {
    CardID: "",
    Date: "",
    Country: "",
    Type: "",
    AccountID: "",
    FirstName: "",
    LastName: "",
    UserID: "",
    MobileNo: "",
    ProductID: "",
    Product: "",
    Qty: "",
    Amount: "",
    Status: ""
  }

  dataSet = []

  openForm() {

  }

  closeForm() {

  }

  getProductID (product:string) {
    if(product == "NFC Plastic") {
      return "1";
    }
    else if(product == "NFC Wood") {
      return "2";
    }
    else {
      return "0";
    }
  }

  getAmount (qty:string) {
    var amount = 120;
    var finalAmount = amount * Number(qty);
    return finalAmount.toString();
  }

  addOrder(creationData : {CardID:string, Country:string, Type:string, AccountID:string, FullName:string, UserID:string, MobileNo:string, Product:string, Qty:string}) {
    var currentDate = new Date();
    var fullName = creationData.FullName.split(' ');
    var firstName = fullName[0];
    var lastName = fullName[1];

    this.data.CardID = creationData.CardID;
    this.data.Date = currentDate.toDateString();
    this.data.Country = creationData.Country;
    this.data.Type = creationData.Type;
    this.data.AccountID = creationData.AccountID;
    this.data.FirstName = firstName;
    this.data.LastName = lastName;
    this.data.UserID = creationData.UserID;
    this.data.MobileNo = creationData.MobileNo;
    this.data.ProductID = this.getProductID(creationData.Product);
    this.data.Product = creationData.Product;
    this.data.Qty = creationData.Qty;
    this.data.Amount = this.getAmount(creationData.Qty);

    this.dataSet.push(this.data);
  }
}

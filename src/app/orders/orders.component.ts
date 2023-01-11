import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../shared/orders.service";



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  coffees = ["Americano", "Flat White", "Cappuccino", "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];


  constructor(private ordersService:OrdersService){}

  ngOnInit(): void {
  }

  form = new FormGroup({        
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''), 
    completed: new FormControl(false)
})


  coffeeOrder = [];
  addCoffee = coffee => this.coffeeOrder.push(coffee);
  removeCoffee = coffee => {
      let index = this.coffeeOrder.indexOf(coffee);
      if (index > -1) this.coffeeOrder.splice(index, 1);
  };


  clearCoffee(){
console.log("entra por aqui");
    this.form.reset();
    this.coffeeOrder=[];
  }

  
  onSubmit() {
    this.form.value.coffeeOrder = this.coffeeOrder;
    let data = this.form.value;
    console.log("entra otra vez");
   this.ordersService.createCoffeeOrder(data)
       .then(res => {
           /*do something here....
           maybe clear the form or give a success message*/
           console.log("entra then...");
           console.log(res);
           this.form.reset();
           this.coffeeOrder=[];
           alert(res);
       }
       
       );
}

}

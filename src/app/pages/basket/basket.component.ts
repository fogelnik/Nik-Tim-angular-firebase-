import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {BasketService} from "../../services/basket.service";
import {ThisReceiver} from "@angular/compiler";
import {Product} from "../product.model";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ]
})
export class BasketComponent implements OnInit {
  items: Product[] = [];
  sum: number = 0;

  constructor(private router: Router, private basketService: BasketService) {}

  ngOnInit() {
    this.items = this.basketService.getCart().map(item => ({
      ...item,
      itemCount: 1
    }));
    this.basketService.basketCardCount = this.items.length;
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.sum = this.items.reduce((acc, item) => acc + item.price * item.itemCount, 0);

    // this.items.forEach(item => {
    //   this.sum = this.sum + item.price * item.itemCount;
    // })

    this.sum = parseFloat(this.sum.toFixed(2));
  }
  navigateToWelcomePage() {
    this.router.navigate(['/']); // Навигация на ProductComponent
  }
  removeItem(index:number){
    let newCount = this.items[index].itemCount;
    this.items.splice(index, 1);
    this.basketService.removeFromCart(index);
    this.updateTotalPrice();
    this.basketService.basketCardCount = this.basketService.basketCardCount - newCount;
  }
  addItem(index: number){
    this.items[index].itemCount += 1;
    this.sum = this.sum + this.items[index].price;
    this.basketService.basketCardCount++;
  }
  decrementItemCount(index:number) {
    this.items[index].itemCount -= 1;
    this.basketService.basketCardCount --;
    this.sum = this.sum - this.items[index].price;
  }
}

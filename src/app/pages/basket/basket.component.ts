import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {BasketService} from "../../services/basket.service";

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
  items: any[] = [];
  sum: number = 0;

  constructor(private router: Router, private basketService: BasketService) {}

  ngOnInit() {
    this.items = this.basketService.getCart().map(item => ({
      ...item,
      originalPrice: item.price, // сохранение первоначальной цены товара
      itemCount: 1 // добавление itemCount для каждого элемента
    }));
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.sum = this.items.reduce((acc, item) => acc + item.price, 0);
    this.sum = parseFloat(this.sum.toFixed(2));
  }
  navigateToWelcomePage() {
    this.router.navigate(['/']); // Навигация на WelcomePageComponent
  }
  removeItem(index:number){
    this.basketService.removeFromCart(index);
    this.items = this.basketService.getCart()
    this.updateTotalPrice();
  }
  addItem(index: number){
    this.items[index].price += this.items[index].originalPrice; // умножение цены на 2
    this.items[index].itemCount += 1; // увеличение количества товара на 1 для конкретного элемента
    this.updateTotalPrice() // обновление общей суммы
  }
  decrementItemCount(index:number) {
    if(this.items[index].itemCount > 1){
      this.items[index].itemCount -= 1;
      this.items[index].price -= this.items[index].originalPrice; //ошибка
      this.updateTotalPrice()
    }
  }
}

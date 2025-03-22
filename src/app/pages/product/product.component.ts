import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {Product} from "../product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    NgForOf,
    NgStyle,
    NgIf
  ],
  standalone: true
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  buttonText: string = 'Послезавтра';
  buttonColor: string = '#a63afb';
  textColor: string = '#fdfdfd'

  constructor(
    private dataService: DataService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.dataService.getCards().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  addToBasket(product: Product, event: any) {
    this.basketService.addToCart(product);

    const button = event.target;
    button.innerText = 'в корзине';
    button.style.backgroundColor = '#f2e5fd';
    button.style.color = '#a73cfb'
  }

  openQuickView(product: any): void {
    // Логика открытия окна быстрого просмотра
    console.log('Быстрый просмотр:', product);
    // Здесь можно открыть модальное окно или отобразить всплывающее окно
  }
}

import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  imports: [
    NgForOf,
    NgStyle,
    NgIf
  ],
  standalone: true
})
export class WelcomePageComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  buttonText: string = 'Послезавтра';
  buttonColor: string = '#a63afb';
  textColor: string = '#fdfdfd'

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getCards().subscribe((data: any) => {
      this.products = data;
    });
  }
  addToCart(product: any, event: any) {
    this.cart.push(product);
    console.log('Продукт добавлен в корзину:', product);

    const button = event.target;
    button.innerText = 'в корзине';
    button.style.backgroundColor = '#f2e5fd';
    button.style.color = '#a73cfb'
  }
}

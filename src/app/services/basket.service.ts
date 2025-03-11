import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private cart: any[] = [];

  constructor() { }

  addToCart(product: any) {
    this.cart.push(product);
    console.log('Продукт добавлен в корзину:', product)
  }
  getCart(){
    return this.cart;
  }
}

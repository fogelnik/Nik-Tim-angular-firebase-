import { Injectable } from '@angular/core';
import {Product} from "../pages/product.model";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private cart: Product[] = [];
  basketCardCount = 0;

  constructor() {
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.basketCardCount ++
    this.saveCartToLocalStorage();
  }
  getCart(){
    this.loadCartFromLocalStorage();
    this.basketCardCount = this.cart.length
    return this.cart;
  }
  removeFromCart(index:number){
    this.cart.splice(index, 1);
    this.saveCartToLocalStorage();
    console.log('Продукт удален из корзины:', index);
  }
  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart) as Product[];
    }
  }
}

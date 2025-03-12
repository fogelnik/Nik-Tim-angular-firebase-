import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private cart: any[] = [];

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(product: any) {
    this.cart.push(product);
    this.saveCartToLocalStorage();
    console.log('Продукт добавлен в корзину:', product);
  }
  getCart(){
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
      this.cart = JSON.parse(savedCart);
    }
  }
}

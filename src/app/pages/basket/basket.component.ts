import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ]
})
export class BasketComponent implements OnInit {
  items: any[] = [];
  sum: number = 0;
  itemCount: number = 1;

  constructor(private router: Router, private basketService: BasketService) {}

  ngOnInit() {
    this.items = this.basketService.getCart();
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.sum = this.items.reduce((acc, item) => acc + item.price, 0);
  }
  navigateToWelcomePage() {
    this.router.navigate(['/']); // Навигация на WelcomePageComponent
  }
  removeItem(index:number){
    this.items.splice(index, 1);
    this.updateTotalPrice();
  }
}

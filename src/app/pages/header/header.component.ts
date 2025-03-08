import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {CurrencyModalComponent} from "../currency-modal/currency-modal.component";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    RouterLink,
    NgIf,
    CurrencyModalComponent,
  ],
  standalone: true
})
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean = false;
  isModalVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  navigateToBasket() {
    this.router.navigate(['/basket']);
  }

  navigateToWelcomePage() {
    this.router.navigate(['/']); // Навигация на WelcomePageComponent
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites']); // Логика для навигации к избранному
  }
}

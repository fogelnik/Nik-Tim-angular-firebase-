import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ProductComponent} from "../../product/product.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    ProductComponent
  ],
  standalone: true
})
export class HomeComponent {
 public authService = inject(AuthService);

  constructor() { }
  onSignOut() {
    this.authService.signOut()
  }
}

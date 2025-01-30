import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 private authService = inject(AuthService);

  constructor() { }
  onSignOut() {
    this.authService.signOut()
  }
}

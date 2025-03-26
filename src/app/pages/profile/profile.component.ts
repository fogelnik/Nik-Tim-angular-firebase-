import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProfileModalService} from "../../services/profile-modal.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true
})


export class ProfileComponent {
  public authService = inject(AuthService);

  constructor(public profileModalService: ProfileModalService) {
  }

  onSignOut() {
    this.authService.signOut();
    this.profileModalService.closeModal()
  }
}

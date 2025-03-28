import {Component, inject, Pipe, PipeTransform} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProfileModalService} from "../../services/profile-modal.service";
import {UserNamePipe} from "../Pipes/user-name.pipe";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    UserNamePipe
  ],
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

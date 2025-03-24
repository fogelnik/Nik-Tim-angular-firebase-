import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ProfileModalService {

  isProfileModalVisible = false;
  constructor() { }

  toggleProfileModal() {
    this.isProfileModalVisible = !this.isProfileModalVisible;
  }
}

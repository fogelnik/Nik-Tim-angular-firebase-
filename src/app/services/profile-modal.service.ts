import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ProfileModalService {
  isModalVisible: boolean = false;

  constructor() { }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }
}

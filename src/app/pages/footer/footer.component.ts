import { Component } from '@angular/core';
import {AppModule} from "../../app.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [
    NgIf
  ],
  standalone: true
})
export class FooterComponent {
  isModalVisible: boolean = false;

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}

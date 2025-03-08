import { Component } from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private dataService: DataService) {
    this.dataService.getCards().subscribe(data => {
      console.log(data)
    })
  }
  title = 'nik-tim-angular-project';
}

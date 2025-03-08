import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) {}

  getCards(){
    return this.http.get('https://nik-tim-angular-firebase-proj-default-rtdb.firebaseio.com/cards.json')
  }
}

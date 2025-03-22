import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../pages/product.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) {}

  getCards(){
    return this.http.get<Product[]>('https://nik-tim-angular-firebase-proj-default-rtdb.firebaseio.com/cards.json')
  }
}

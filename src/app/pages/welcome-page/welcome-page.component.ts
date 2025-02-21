import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  products: Product[] = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'url1' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200, imageUrl: 'url2' },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 200, imageUrl: 'url3' },
    { id: 4, name: 'Product 4', description: 'Description 4', price: 200, imageUrl: 'url4' },
    { id: 5, name: 'Product 5', description: 'Description 5', price: 200, imageUrl: 'url5' },
    { id: 6, name: 'Product 6', description: 'Description 6', price: 200, imageUrl: 'url6' },
    { id: 7, name: 'Product 7', description: 'Description 7', price: 200, imageUrl: 'url7' },
    { id: 8, name: 'Product 8', description: 'Description 8', price: 200, imageUrl: 'url8' },
    { id: 9, name: 'Product 9', description: 'Description 9', price: 200, imageUrl: 'url9' },
    { id: 10, name: 'Product 10', description: 'Description 10', price: 200, imageUrl: 'url10' },
    { id: 11, name: 'Product 11', description: 'Description 11', price: 200, imageUrl: 'url11' },
    { id: 12, name: 'Product 12', description: 'Description 12', price: 200, imageUrl: 'url12' },
    { id: 13, name: 'Product 13', description: 'Description 13', price: 200, imageUrl: 'url13' },
    { id: 14, name: 'Product 14', description: 'Description 14', price: 200, imageUrl: 'url14' },
    { id: 15, name: 'Product 15', description: 'Description 15', price: 200, imageUrl: 'url15' },
  ];
}

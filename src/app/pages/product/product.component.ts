import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {Product} from "../product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  isModalOpen = false
  isProductInCart: boolean = false;
  buttonText: string = 'Послезавтра';



  constructor(
    private dataService: DataService,
    private router: Router,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.loadProducts()
  }
  loadProducts() {
    this.isLoading = true;
    this.dataService.getCards().subscribe((data: Product[]) => {
      this.products = data;
      this.isLoading = false;
    });
  }
  openProductDetails(product: any): void {
    this.router.navigate(['/product-details'], { state: { product } });
  }
  addToBasket(product: Product, event: any) {
    const button = event.target;

    if(!this.isProductInCart){
      this.basketService.addToCart(product);
      this.isProductInCart = true;

      button.innerText = 'в корзине';
      button.style.backgroundColor = '#f2e5fd';
      button.style.color = '#a73cfb'
    }else {
      this.router.navigate(['/basket']);
    }
  }

  selectedProduct: Product | null = null; // Выбранный продукт

  openQuickView(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  onBackdropClick(event: MouseEvent){
    const target = event.target as HTMLElement;

    if(target.classList.contains('product__modal')){
      this.closeModal();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') { // Проверяем, нажата ли клавиша Escape
      this.closeModal();
    }
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    // Вычисляем координаты мыши внутри элемента
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Устанавливаем transform-origin
    target.style.transformOrigin = `${x}% ${y}%`;
    target.style.transform = 'scale(1.5)'; // Увеличение в 2 раза
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    target.style.transformOrigin = 'center';
    target.style.transform = 'scale(1)'; // Возвращаем к оригинальному размеру
  }

  //slider

  currentIndex = 0;
  indicators = new Array(5);

  prevSlide(): void {
    const slides = document.querySelector('.product__slider-slides') as HTMLElement;
    const totalSlides = slides.children.length;

    this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
    this.updateSlidePosition(slides);
  }

  nextSlide(): void {
    const slides = document.querySelector('.product__slider-slides') as HTMLElement;
    const totalSlides = slides.children.length;

    this.currentIndex = (this.currentIndex + 1) % totalSlides;
    this.updateSlidePosition(slides);
  }

  updateSlidePosition(slides: HTMLElement): void {
    slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }


}

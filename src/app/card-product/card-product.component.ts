import { Component, Input } from '@angular/core';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  @Input() image = "";
  @Input() title = "";
  @Input() description = "";
  @Input() price = 0;
  @Input() id_product = "";
  @Input() category = "";
  @Input() rate = 0;
  @Input() count = 0;
  
  public showToast: boolean = false;
  isModalOpen = false; // Controla la visibilidad del modal

  constructor(private cartService: CartServiceService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addProduct() {
    const product = {
      id: this.id_product,
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image
    };

    this.cartService.addProductCart(product);
    this.showToast = true; // Muestra el toast

    // Oculta el toast después de 3 segundos
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

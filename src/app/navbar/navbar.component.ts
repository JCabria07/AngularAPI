import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductsServiceService } from '../Services/products.service.service';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  category: any = {};
  cartItems: any[] = [];
  total: number = 0;
  isOffcanvasOpen: boolean = false;

  @Output() categorySelected = new EventEmitter<string>();

  constructor(private httpSrv: ProductsServiceService, private cartService: CartServiceService) {}

  async ngOnInit() {
    this.category = await this.httpSrv.get(environment.URL_FAKE_API + "products/categories");
    this.updateCart();
    this.cartService.cartUpdated.subscribe(() => this.updateCart()); // Suscripción a los cambios en el carrito
  }

  public getCategory(category: string) {
    this.categorySelected.emit(category);
  }

  public toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  private updateCart() {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotalValue();
  }

  public removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.updateCart(); // Actualiza el carrito y el total después de eliminar un artículo
  }
}

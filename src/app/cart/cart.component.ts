import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartItems: any[] = [];
  public total: number = 0;
  public isOffcanvasOpen: boolean = false;
  public showToast: boolean = false;

  constructor(public cartService: CartServiceService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotalValue();
  }

  public toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen; // Alterna el estado del offcanvas
  }

  public removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotalValue();
  }
}

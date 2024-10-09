import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cart: any[] = [];
  cartUpdated = new EventEmitter<void>(); // Evento para notificar cambios en el carrito

  addProductCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartUpdated.emit(); // Emitir evento cuando se actualice el carrito
  }

  getCart() {
    const cartData = localStorage.getItem('cart');
    this.cart = cartData ? JSON.parse(cartData) : [];
    return this.cart;
  }

  getTotalValue() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartUpdated.emit(); // Emitir evento cuando se actualice el carrito
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart'); // Elimina el carrito del localStorage
    }
}


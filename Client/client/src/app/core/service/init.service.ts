import { inject, Injectable } from '@angular/core';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  private cartService = inject(CartService);

  init() {
    // Check if we are in the browser
    if (typeof window !== 'undefined') {
      const cartId = localStorage.getItem('cart_id');
      const cart$ = cartId ? this.cartService.getCart(cartId) : of(null);
      return cart$;
    }
    // If not in the browser, return an observable that resolves to null
    return of(null);
  }
}

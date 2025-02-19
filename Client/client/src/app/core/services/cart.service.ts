import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/Product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'http://localhost:5045/api/';

  private http = inject(HttpClient);

  cart = signal<Cart | null>(null);

  itemCount = computed(()=>{
    return this.cart()?.items.reduce((sum,item)=>sum+item.quantity,0)
  })

  // Get the current cart (from backend or localStorage)
  getCart(id: string) {
    return this.http.get<Cart>(`${this.baseUrl}cart?id=${id}`).pipe(
      map(cart=>{
        this.cart.set(cart);

        return cart;
      })
    )
   
  }

  // Set or update the cart
  setCart(cart: Cart) {
    return this.http.post<Cart>(`${this.baseUrl}cart`, cart).subscribe({
      next: updatedCart => this.cart.set(updatedCart),
      error: err => console.error('Failed to set cart:', err)
    });
  }

  // Add an item to the cart (handle both CartItem and Product)
  addItemToCart(item: CartItem | Product, quantity = 1) {
    const cart = this.cart() ?? this.createCart();  // Get current cart or create new one

    // Map Product to CartItem if the item is a Product
    if (this.isProduct(item)) {
      item = this.mapProductToCartItem(item);
    }

    // Add or update the item in the cart
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);

    // Save the updated cart
    this.setCart(cart);
  }

  // Add or update a CartItem in the cart
  private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
    const index = items.findIndex(x => x.productId === item.productId);

    if (index === -1) {
      item.quantity = quantity;
      items.push(item);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  // Convert Product to CartItem
  private mapProductToCartItem(product: Product): CartItem {
    return {
      productId: product.id,
      productName: product.name,
      quantity: 0,
      pictureUrl: product.pictureUrl,
      brand: product.brand,
      type: product.type,
      price: product.price
    };
  }

  // Type guard to check if the item is a Product
  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }

  // Create a new cart if none exists
  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}

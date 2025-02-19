import { Component, inject, Input, input } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-item',
  imports: [MatCard , MatCardContent ,CurrencyPipe,MatCardActions,MatButton,MatIcon,RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
@Input() product ?:Product;

cartService = inject(CartService);

addToCart(event: Event, product: Product): void {
  event.stopPropagation();  // Prevent image click

  if (product) {
    this.cartService.addItemToCart(product);  // Add product to cart
  }
}

}

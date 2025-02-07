import { Component, Input, input } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [MatCard , MatCardContent ,CurrencyPipe,MatCardActions,MatButton,MatIcon],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
@Input() product ?:Product
}

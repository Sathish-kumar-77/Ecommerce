import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { Product } from './shared/models/Product';
import { CommonModule } from '@angular/common';
import { Pagination } from './shared/models/pagination';
import { ShopService } from './core/services/shop.service';
import { ShopComponent } from "./feature/shop/shop.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {


 
 
}

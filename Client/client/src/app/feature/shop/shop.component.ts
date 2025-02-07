import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/Product';
import {MatCard} from '@angular/material/card'
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { resourceUsage } from 'process';
import { response } from 'express';
import { error } from 'console';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-shop',
  imports: [MatCard, ProductItemComponent ,MatButton,MatIcon,MatMenu,MatSelectionList,MatListOption,MatMenuTrigger],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  
   title = 'skinet';
    private shopService = inject (ShopService);

    private dialogService =inject (MatDialog)
    products: Product[] = [];
    selectedBrands : string []=[];
    selectedTypes : string []=[];
    selectedSort : string  ='name'

    sortOptions =[
      { name: 'Alphabetical' , value :'name'},
      { name: 'Price: low-High' , value :'priceAsc'},
      { name: 'Price : high-low ' , value :'priceDesc'},
    
  ]
   
    ngOnInit(): void {
     
      this.initilizeShop();
    }

    // services for shop 
    initilizeShop(){
      this.getProducts();
      this.shopService.getBrands();

      this.shopService.getTypes();

    

    }


    getProducts(){

      this.shopService.getProducts(this.selectedBrands,this.selectedTypes, this.selectedSort).subscribe
      ({
        next: response => this.products = response.data,
        error: error => console.log(error)
       
  
      })

    }
    onSortChange(event : MatSelectionListChange){
      const selectedOption = event.options[0];

      if(selectedOption)
      {
        this.selectedSort = selectedOption.value;
        this.getProducts();
      }

    }

    openFilterDialog(){

      const dialogRef= this.dialogService.open(FiltersDialogComponent,{minWidth:'500px',
        data:{
          selectedBrands :this.selectedBrands,
          selectedTypes : this.selectedTypes
        }
      });

      dialogRef.afterClosed().subscribe({
        next : result =>{
          if(result){
            console.log(result);

            this.selectedBrands= result.selectedBrands;
            this.selectedTypes= result.selectedTypes;

            this.getProducts();
          }
        }
      })
    }

}

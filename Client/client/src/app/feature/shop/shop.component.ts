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
import { shopParams } from '../../shared/models/shopParams';
import {MatPaginator, PageEvent} from '@angular/material/paginator'
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [ ProductItemComponent ,MatButton,MatIcon,MatMenu,MatSelectionList,MatListOption,MatMenuTrigger,MatPaginator,
    FormsModule
  
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  
   title = 'skinet';
    private shopService = inject (ShopService);

    private dialogService =inject (MatDialog)
    products ?: Pagination<Product>
   

    sortOptions =[
      { name: 'Alphabetical' , value :'name'},
      { name: 'Price: low-High' , value :'priceAsc'},
      { name: 'Price : high-low ' , value :'priceDesc'},
    
  ]

  shopParams =new shopParams();
   pageSizeOptions =[5,10,15,20]
    ngOnInit(): void {
     
      this.initilizeShop();
    }

    // services for shop 
    initilizeShop(){
      this.getProducts();
      this.shopService.getBrands();

      this.shopService.getTypes();

    

    }
onSearchChange(){
  this.shopParams.pageNumber=1;
  this.getProducts();
}

    getProducts(){

      this.shopService.getProducts(this.shopParams).subscribe
      ({
        next: response => this.products = response,
        error: error => console.log(error)
       
  
      })

    }
    onSortChange(event : MatSelectionListChange){
      const selectedOption = event.options[0];

      if(selectedOption)
      {
        this.shopParams.sort = selectedOption.value;
        this.shopParams.pageNumber=1;
        this.getProducts();
      }

    }
    handlePageEvent(event : PageEvent){

      this.shopParams.pageNumber=event.pageIndex +1 ;
      this.shopParams.pageSize=event.pageSize;
      this.getProducts();

    }

    openFilterDialog(){

      const dialogRef= this.dialogService.open(FiltersDialogComponent,{minWidth:'500px',
        data:{
          selectedBrands :this.shopParams.brands,
          selectedTypes : this.shopParams.types
        }
      });

      
      dialogRef.afterClosed().subscribe({
        next : result =>{
          if(result){
            console.log(result);

            this.shopParams.brands= result.selectedBrands;
            this.shopParams.types= result.selectedTypes;
            this.shopParams.pageNumber=1;
            this.getProducts();
          }
        }
      })
    }

}

import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import {MatDivider} from '@angular/material/divider'
import{MatListOption, MatSelectionList} from '@angular/material/list'
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import{MatMenu} from '@angular/material/menu'
@Component({
  selector: 'app-filters-dialog',
  imports: [MatDivider,MatSelectionList,MatListOption,MatButton,FormsModule,MatMenu,MatSelectionList,MatListOption],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.css'
})
export class FiltersDialogComponent {

  shopService = inject (ShopService);

  private dialogref = inject(MatDialogRef<FiltersDialogComponent>);


  data = inject(MAT_DIALOG_DATA);

  selectedBrands : string [] = this.data.selectedBrands;

  selectedTypes : string [] = this.data.selectedTypes;



  applyFilters(){
    this.dialogref.close({
      selectedBrands :this.selectedBrands,
      selectedTypes : this.selectedTypes
    })
  }
}

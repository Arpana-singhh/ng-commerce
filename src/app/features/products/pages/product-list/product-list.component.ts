import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../components/pagination/pagination.component';


@Component({
  selector: 'app-product-list',
  imports: [FormsModule, ProductCardComponent, PaginationComponent], // 👈 THIS FIXES EVERYTHING
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
searchText = '';

onSearch() {
  console.log(this.searchText);
}
}
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductModel } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';


@Component({
  selector: 'app-product-list',
  imports: [FormsModule, ProductCardComponent, PaginationComponent], // 👈 THIS FIXES EVERYTHING
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: ProductModel[] = [];
  total = 0;
  currentPage = 1;
  limit = 10;
  loading = false;
  searchText = '';

  constructor(private productService: ProductService) {}
    
      ngOnInit(): void {
        this.getProducts();
      }
    
      getProducts() {
        this.loading = true;
        this.productService.getProducts(this.currentPage, this.limit).subscribe({
          next: (res) => {
            this.products = res.products;
            this.total = res.total;
            this.loading = false;
          },
          error: () => (this.loading = false)
        });
      }
  
        onPageChange(page: number) {
        this.currentPage = page;
        this.getProducts()
    }
  

    onSearch() {
      console.log(this.searchText);
    }
}

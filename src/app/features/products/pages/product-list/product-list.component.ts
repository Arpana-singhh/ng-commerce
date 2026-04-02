import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductModel } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductCardComponent, PaginationComponent], // 👈 THIS FIXES EVERYTHING
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
  sortBy = '';
  order = '';
  selectedSort = '';
  categories: string[] = [];
  selectedCategory = '';

  constructor(private productService: ProductService) {}
    
      ngOnInit(): void {
        this.getProducts();
        this.getCategories();
      }
    
      getProducts() {
        this.loading = true;
        this.productService.getProducts(this.currentPage, this.limit, this.searchText, this.sortBy, this.order).subscribe({
          next: (res) => {
            this.products = res.products;
            this.total = res.total;
            this.loading = false;
          },
          error: () => (this.loading = false)
        });
      }

      getCategories() {
        this.productService.getCategories().subscribe({
          next: (res) => this.categories = res,
          error: () => this.categories = []
        });
      }

      onCategoryChange(category: string) {
        this.selectedCategory = category;
        this.currentPage = 1;

        if (category) {
          this.loading = true;
          this.productService.getProductsByCategory(category).subscribe({
            next: (res) => {
              this.products = res.products;
              this.total = res.total;
              this.loading = false;
            },
            error: () => (this.loading = false)
          });
        } else {
          this.getProducts();
        }
      }

      onPageChange(page: number) {
        this.currentPage = page;
        this.getProducts()
      }
  

    onSearch() {
      this.currentPage = 1; // reset pagination
      this.getProducts();
    }

    onSortChange(value: string) {
      this.currentPage = 1;

      const map: any = {
        price_asc: { sortBy: 'price', order: 'asc' },
        price_desc: { sortBy: 'price', order: 'desc' },
        title_asc: { sortBy: 'title', order: 'asc' }
      };

      this.sortBy = map[value]?.sortBy || '';
      this.order = map[value]?.order || '';

      this.getProducts();
    }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true, // 👈 IMPORTANT (if using standalone)
  imports: [CommonModule], // 👈 THIS FIXES EVERYTHING
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit{
  products: ProductModel[] = [];
    loading = false;
  
    constructor(private productService: ProductService) {}
  
    ngOnInit(): void {
      this.getProducts();
    }
  
    getProducts() {
      this.loading = true;
  
      this.productService.getProducts().subscribe({
        next: (res) => {
          this.products = res.products;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }

}

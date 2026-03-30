import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true, // 👈 IMPORTANT (if using standalone)
  imports: [CommonModule], // 👈 THIS FIXES EVERYTHING
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent{
  @Input() products: ProductModel[] = [];
  @Input() loading = false; 
}

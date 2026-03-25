import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';


@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent], // 👈 THIS FIXES EVERYTHING
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

}
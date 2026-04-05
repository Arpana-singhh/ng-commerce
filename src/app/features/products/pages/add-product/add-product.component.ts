import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { ProductModel } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  productForm!: FormGroup;
  loading = false;
  submitted = false;

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {}

    ngOnInit(): void {
    this.productForm = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price:       [null, [Validators.required, Validators.min(0)]],
      stock:       [null, [Validators.required, Validators.min(0)]],
      category:    ['', Validators.required],
      brand:       [''],
      thumbnail:   ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

   get f() {
    return this.productForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) return;

    this.loading = true;

    const payload = ProductModel.fromForm(this.productForm.getRawValue());

    this.productService.addProduct(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

    onCancel(): void {
    this.router.navigate(['/products']);
  }

}

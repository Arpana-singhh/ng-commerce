import { ProductModel } from './product.model';
import type { Dimensions, Meta, Review } from './product.model';

export interface ProductDetailApiModel {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export class ProductDetailModel extends ProductModel {
  constructor(raw: Partial<ProductDetailApiModel> = {}) {
    super(raw);
  }

  static override fromApi(raw: Partial<ProductDetailApiModel> = {}): ProductDetailModel {
    return new ProductDetailModel(raw);
  }

  get discountLabel(): string {
    const discount = Number(this.discountPercentage);
    const safeDiscount = Number.isFinite(discount) ? discount : 0;
    return `${safeDiscount.toFixed(2)}% OFF`;
  }

  get fullStars(): number {
    const rating = Number(this.rating);
    const safeRating = Number.isFinite(rating) ? rating : 0;
    return Math.floor(safeRating);
  }

  get hasHalfStar(): boolean {
    const rating = Number(this.rating);
    const safeRating = Number.isFinite(rating) ? rating : 0;
    return safeRating % 1 >= 0.5;
  }

  get emptyStars(): number {
    return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
  }

  get isInStock(): boolean {
    return this.stock > 0;
  }
}

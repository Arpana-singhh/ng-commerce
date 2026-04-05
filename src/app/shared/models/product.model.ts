export class ProductsResponseModel {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;

  constructor(raw: any = {}) {
    this.products = ProductModel.fromApiList(raw.products);
    this.total = raw.total ?? 0;
    this.skip = raw.skip ?? 0;
    this.limit = raw.limit ?? 0;
  }

  static fromApi(raw: any): ProductsResponseModel {
    return new ProductsResponseModel(raw);
  }
}

export type ProductCreatePayload = {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  thumbnail: string;
};

export class ProductModel {

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

  constructor(raw: any = {}) {
    this.id = raw.id ?? 0;
    this.title = raw.title ?? '';
    this.description = raw.description ?? '';
    this.category = raw.category ?? '';
    this.price = raw.price != null ? Number(raw.price) : 0;
    this.discountPercentage = raw.discountPercentage != null ? Number(raw.discountPercentage) : 0;
    this.rating = raw.rating != null ? Number(raw.rating) : 0;
    this.stock = raw.stock ?? 0;
    this.tags = raw.tags ?? [];
    this.brand = raw.brand ?? '';
    this.sku = raw.sku ?? '';
    this.weight = raw.weight ?? 0;

    this.dimensions = {
      width: raw.dimensions?.width ?? 0,
      height: raw.dimensions?.height ?? 0,
      depth: raw.dimensions?.depth ?? 0
    };

    this.warrantyInformation = raw.warrantyInformation ?? '';
    this.shippingInformation = raw.shippingInformation ?? '';
    this.availabilityStatus = raw.availabilityStatus ?? '';

    this.reviews = (raw.reviews ?? []).map((r: any) => ({
      rating: r.rating ?? 0,
      comment: r.comment ?? '',
      date: r.date ?? '',
      reviewerName: r.reviewerName ?? '',
      reviewerEmail: r.reviewerEmail ?? ''
    }));

    this.returnPolicy = raw.returnPolicy ?? '';
    this.minimumOrderQuantity = raw.minimumOrderQuantity ?? 0;

    this.meta = {
      createdAt: raw.meta?.createdAt ?? '',
      updatedAt: raw.meta?.updatedAt ?? '',
      barcode: raw.meta?.barcode ?? '',
      qrCode: raw.meta?.qrCode ?? ''
    };

    this.images = raw.images ?? [];
    this.thumbnail = raw.thumbnail ?? '';
  }

  static fromApi(raw: any): ProductModel {
    return new ProductModel(raw);
  }

  static fromApiList(list: any[] = []): ProductModel[] {
    return list.map(item => new ProductModel(item));
  }

  static fromForm(raw: any): ProductModel {
    return new ProductModel({
      title: raw?.title ?? '',
      description: raw?.description ?? '',
      price: raw?.price != null ? Number(raw.price) : 0,
      stock: raw?.stock != null ? Number(raw.stock) : 0,
      category: raw?.category ?? '',
      brand: raw?.brand ?? '',
      thumbnail: raw?.thumbnail ?? ''
    });
  }

  toForm(): ProductCreatePayload {
    const payload: ProductCreatePayload = {
      title: this.title,
      description: this.description,
      price: this.price,
      stock: this.stock,
      category: this.category,
      thumbnail: this.thumbnail
    };

    if (this.brand) {
      payload.brand = this.brand;
    }

    return payload;
  }

  toJson(): object {
    return this.toForm();
  }
}


/* Optional Interfaces (for typing clarity) */
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

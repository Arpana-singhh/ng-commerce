import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductModel, ProductsResponseModel } from '../../shared/models/product.model';
import { ProductDetailModel } from '../../shared/models/productdetail.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

    getProducts(page: number, limit: number, searchText?: string, sortBy?: string, order?: string): Observable<ProductsResponseModel> {
    const skip = (page - 1) * limit;

    let url = searchText
      ? `${this.baseUrl}/products/search?q=${searchText}`
      : `${this.baseUrl}/products?limit=${limit}&skip=${skip}`;


    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    return this.http
      .get<any>(url)
      .pipe(map(res => ProductsResponseModel.fromApi(res)));
  }

    getProductById(id: number): Observable<ProductDetailModel> {
    return this.http
      .get<any>(`${this.baseUrl}/products/${id}`)
      .pipe(map(res => ProductDetailModel.fromApi(res)));
  }

  addProduct(payload: ProductModel): Observable<ProductDetailModel> {
    return this.http
      .post<any>(
        `${this.baseUrl}/products/add`,
        payload.toForm(),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(map(res => ProductDetailModel.fromApi(res)));
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }

  getProductsByCategory(category: string): Observable<ProductsResponseModel> {
    return this.http
      .get<any>(`${this.baseUrl}/products/category/${category}`)
      .pipe(map(res => ProductsResponseModel.fromApi(res)));
  }
}

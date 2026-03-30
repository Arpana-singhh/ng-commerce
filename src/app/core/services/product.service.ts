import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductsResponseModel } from '../../shared/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(page: number, limit: number): Observable<ProductsResponseModel> {
  const skip = (page - 1) * limit;

  return this.http
    .get<any>(`${this.baseUrl}/products?limit=${limit}&skip=${skip}`)
    .pipe(map(res => ProductsResponseModel.fromApi(res)));
}
}
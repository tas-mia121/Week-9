import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProduct(id: string) {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}

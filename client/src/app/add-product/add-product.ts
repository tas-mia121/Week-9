import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.html'
})
export class AddProductComponent {

  product: Product = {
    id: 0,
    name: '',
    type: '',
    description: '',
    price: 0,
    units: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct(): void {

    this.productService.addProduct(this.product).subscribe({
      next: () => {
        alert('Product added successfully');

        this.router.navigate(['/products']);
      },

      error: (error) => {

        console.error(error);

        if (error.status === 409) {
          alert('A product with this ID already exists.');
        } else {
          alert('Failed to add product.');
        }
      }
    });
  }
}
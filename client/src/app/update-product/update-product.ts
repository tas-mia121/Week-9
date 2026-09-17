import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-product.html'
})
export class UpdateProductComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    type: '',
    description: '',
    price: 0,
    units: 0
  };

  productId = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id') || '';

    this.productService.getProducts().subscribe({
      next: (products) => {

        const foundProduct = products.find(
          product => product._id === this.productId
        );

        if (foundProduct) {
          this.product = foundProduct;
        }

      },

      error: (error) => {
        console.error(error);
      }
    });
  }

  updateProduct(): void {

    this.productService.updateProduct(
      this.productId,
      this.product
    ).subscribe({

      next: () => {

        alert('Product updated successfully');

        this.router.navigate(['/products']);

      },

      error: (error) => {

        console.error(error);

        alert('Failed to update product.');

      }

    });
  }
}
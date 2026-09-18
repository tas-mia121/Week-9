import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProductComponent {

  product: any = {
    name: '',
    description: '',
    price: 0,
    units: 0
  };

  constructor(private service: ProductService, private router: Router) {}

  addProduct() {
    this.service.addProduct(this.product).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => console.error(err)
    });
  }
}

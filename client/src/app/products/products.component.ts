import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {

  products: any[] = [];

  constructor(
    private service: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log("ProductsComponent LOADED");
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe((data: any) => {
      this.products = data;
      this.cdr.markForCheck();
    });
  }

  deleteProduct(id: string) {
    this.service.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}

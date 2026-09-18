import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-product.html',
  styleUrls: ['./update-product.css']
})
export class UpdateProductComponent {

  id: string = '';
  product: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.service.getProduct(this.id).subscribe((data: any) => {
      this.product = data;
    });
  }

  updateProduct() {
    this.service.updateProduct(this.id, this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}

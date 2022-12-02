import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[] | undefined;
  filteredProducts: any[] | string[] | undefined;
  subscription : Subscription | undefined;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(products => this.filteredProducts = this.products = products);
   }

  filter(query : string) {
    this.filteredProducts = (query) ? this.products?.filter(p => p.payload.val().title?.toLowerCase().includes(query.toLowerCase())) : this.products;
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

}

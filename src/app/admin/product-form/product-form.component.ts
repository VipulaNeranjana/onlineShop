import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any;

  constructor(
    private router: Router,
    private categoryService : CategoryService,
    private productService : ProductService) {
    this.categories$ = categoryService.getCategories().valueChanges();
    console.log(this.categories$);
  }

  save(product: any){
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
     console.log(product);
  }

  ngOnInit(): void {
  }

}

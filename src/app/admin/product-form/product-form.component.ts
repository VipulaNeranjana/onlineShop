import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any;

  constructor(categoryService : CategoryService,private productService : ProductService) {
    this.categories$ = categoryService.getCategories().valueChanges();
    console.log(this.categories$);
  }

  save(product: any){
     this.productService.create(product);
     console.log(product);
  }

  ngOnInit(): void {
  }

}

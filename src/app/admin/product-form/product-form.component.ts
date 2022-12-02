import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any;
  product : any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute, // for read rout parameters
    private categoryService : CategoryService,
    private productService : ProductService) {
    this.categories$ = categoryService.getCategories().valueChanges();
    
    let id = route.snapshot.paramMap.get('id');
    if (id) productService.get(id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    console.log(this.categories$, this.product);
  }

  save(product: any){
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
     console.log(product);
  }

  ngOnInit(): void {
  }

}

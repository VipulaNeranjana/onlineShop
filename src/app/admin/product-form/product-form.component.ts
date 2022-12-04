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
  id : any;

  constructor(
    private router: Router,
    private route: ActivatedRoute, // for read rout parameters
    private categoryService : CategoryService,
    private productService : ProductService) {
    this.categories$ = categoryService.getCategories().valueChanges();
    
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    console.log(this.categories$, this.product);
  }

  save(product: any){
    if (this.id) this.productService.update(this.id, product);

    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
    console.log(product);
  }

  delete() {
    if (!confirm('Are you sure that you want to delete this prduct??')) return;
      
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

  ngOnInit(): void {
  }

}



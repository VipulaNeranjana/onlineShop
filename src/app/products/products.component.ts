import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] | undefined;
  filteredProducts : Product[] | undefined;
  category : any;

  constructor(
    rout : ActivatedRoute, //to read rout parameters
    productService : ProductService) {

    productService.getAll().snapshotChanges().pipe(map(change => 
      change.map(c => {
        const data = c.payload.val() as Product;
        return {...data};
      })
    )).pipe((switchMap(data => {
      this.products = data;
      return rout.queryParamMap;
    })))
    .subscribe(param => {
    this.category = param.get('category');  // read the rout parameters
    
    
    this.filteredProducts = (this.category) ?  //setting the filtered arry
      this.products?.filter(p => p.category.toLowerCase() == this.category.toLowerCase()) : this.products;
    
    });

    
   
    
  }

  ngOnInit(): void {
  }

}

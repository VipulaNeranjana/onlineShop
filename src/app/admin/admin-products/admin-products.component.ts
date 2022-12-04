import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // products: any[] | undefined;
  // filteredProducts: any[] | string[] | undefined;
  // subscription : Subscription | undefined;

  subscription2 : Subscription | undefined;
  storeProducts : any[] | undefined;
  filteredf : any[] | undefined;
  displayedColumns: string[] = ['title', 'price', 'id'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private productService: ProductService) {
    // this.subscription = this.productService.getAll().snapshotChanges().subscribe(products => this.filteredProducts = this.products = products);
  }

  // filter(query : string) {
  //   this.filteredProducts = (query) ? this.products?.filter(p => p.payload.val().title?.toLowerCase().includes(query.toLowerCase())) : this.products;
  // }

  
  ngOnDestroy(): void {
    // this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  ngOnInit(): void {

    

    this.subscription2 = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val() as Product;
              const id = c.payload.key;
              return { id, ...data };
          })
      )
    ).subscribe(data => {
      this.storeProducts = data;
      this.dataSource = new MatTableDataSource(this.storeProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = function(data : any, filter: string): boolean {
        return data.title.toLowerCase().includes(filter);
      };
    });

    

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

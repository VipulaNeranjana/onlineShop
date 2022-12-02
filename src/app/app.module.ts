import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';


import { RouterModule } from '@angular/router';

import { BNavbarComponent } from './b-navbar/b-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component'
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';


@NgModule({
  declarations: [
    AppComponent,
    BNavbarComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //form validation
    CustomFormsModule,
  
    //firebase modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,  
    AngularFirestoreModule,
    AngularFireStorageModule,

    //form controlling
    FormsModule,

    //routing
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: HomeComponent}, 
      {path: 'shopping-cart', component: CartComponent}, 
      {path: 'login', component: LoginComponent}, 
      
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]}, 
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: 'my/orders' , component: MyOrdersComponent, canActivate: [AuthGuardService]}, 
      
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService,AdminAuthGuardService]}, 
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService,AdminAuthGuardService]}, 
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService,AdminAuthGuardService]}, 
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService,AdminAuthGuardService]}, 
    ]),

     //ng-bootstrap directives
     NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Product } from "./product";

export interface ShoppingCartItem {
    items: any;
    product : Product;
    quantity : Number;
}
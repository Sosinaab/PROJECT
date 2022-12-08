import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Product } from '../product/product.service';

export interface Cart{
  id: number ; 
  userId: number;
  date : Date;
  products : Products;
}
export type Products = {
  productId : number;
  quantity : number;
  
  }

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any;

  

  constructor(private httpClient : HttpClient) { }
     
   getCardProducts(){
    return this.httpClient.get<any>('https://fakestoreapi.com/carts')
    .pipe(map((res:any)=>{  
      return res;
    })) 
  }  

   addtoCart(id: number ,productId : number,quantity : number , userId : number):Observable<any> {

    const body = {
      id : id,
      productId : productId ,
      quantity : quantity ,
       userId : userId
   
    }
      return this.httpClient.post('https://fakestoreapi.com/carts', body  )
    }
    getCardDetail(id:number):Observable<any>{
      return  this.httpClient.get(`https://fakestoreapi.com/carts/${id}`).pipe(map((res:any)=>{  
        this.cart = res;
        return res;
      })) }
clearCart(id: number):Observable<any>{

  return this.httpClient.delete(`https://fakestoreapi.com/carts/${id}`)
  .pipe(map(x => {
    // auto logout if the logged in user deleted their own record
    
    return x;
}));
}



}
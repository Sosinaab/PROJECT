import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
export interface Product{
  id: number ; 
  title : string;
  price : number;
  description : string ;
  category : string;
  image : string;
  rating : Rate;
}

/* export interface Rate extends Product {
rate : number;
count : number;

} */
export type Rate = {
  rate : number;
  count : number;
  
  }

@Injectable({
  providedIn: 'root'
})
export class ProductService {
product : Product[] = [];
  constructor(private httpClient: HttpClient) { }
   getProducts(){
    return this.httpClient.get<Product>("https://fakestoreapi.com/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  } 

  getProductDetail(id:number):Observable<any>{
  return  this.httpClient.get(`https://fakestoreapi.com/products/${id}`)
}
}

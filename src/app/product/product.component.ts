import { Component , Input, OnInit} from '@angular/core';
import { ProductService, Product } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';
 import { CartService } from '../cart/cart.service';
import { User } from '../user/user.service';
import { first, map, mergeMap } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { _MatTabBodyBase } from '@angular/material/tabs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()  currentUser !: User ;
products : Product[] = [];
quantity !: number ;
currentUserId !:any ;
order: string = 'category';
  carts: any;
  ids: any;
  cartDetails: any;
  id: any;
  currentRating =3;
  constructor(public productService: ProductService,
   private router: Router,
   private authenticationService :AuthenticationService,
        private alertService: AlertService, 
        private route : ActivatedRoute ,
   private cartService : CartService){
    if(this.currentUser){
      this.currentUserId = this.authenticationService.parseJwt(this.currentUser.token).sub;
  }
   }

 ngOnInit(){
  this.getcart()

  
  this.productService.getProducts().subscribe(
  res=>{
    this.products = res;
 })
}
viewDetails(product : Product){
  this.router.navigate(['product-detail', product.id])
}
getcart(){
 
  this.cartDetails =this.cartService.getCardProducts().subscribe( async (res: any)=>{
    this.carts = res;

    this.ids= this.carts.filter((el : any) => el.userId === this.currentUserId).map((el : any) => el.id).flat();
   return this.ids;
  })

}

addtocart(product: Product,){ 
  for(let i = 0; i< this.ids.length ; i++){
    this.id = this.ids[i]

 this.quantity++;

  this.cartService.addtoCart(this.id ,product.id,this.quantity, this.currentUserId ).pipe(first())
   .subscribe({
       next: () => {
           // get return url from query parameters or default to home page
           this.alertService.success('Thank you for your purchase')
          
       },
       error: error => {
           this.alertService.error(error);
       }
   });
   

  }
}
}

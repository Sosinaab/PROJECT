import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, mergeMap, Observable } from 'rxjs';
import { CartService, Cart  } from './cart.service';
import { User } from '../user/user.service';
import { AuthenticationService } from '../authentication.service';
import { ProductService,Product } from '../product/product.service';

import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit {

 // productDetails!: Observable<Cart>;
  public products : any = [];
  public productsD : any = [];
  private count = 1;
  public productsNew : any = [];
  public total !: number;
  public productDetails!: Observable<Product>;
  isLoading = true ;
   currentUserId!: number;
 currentUser !: User;
  ids: any;





  constructor(private cartService : CartService,
     private router: Router,
     private authenticationService: AuthenticationService,
     private productService : ProductService,
     private alertService: AlertService
    ) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserId = this.authenticationService.parseJwt(this.currentUser.token).sub;
    }
   
  getAlreadyProducts (){
this.products = this.cartService.getCardProducts().subscribe( async (res: any)=>{
     this.products = res;
     this.ids= this.products.filter((el : any) => el.userId === this.currentUserId).map((el : any) => el.id).flat();
     this.products =  this.products.filter((el : any) => el.userId === this.currentUserId).map((el : any) => el.products).flat();
   
      this.total = 0;
    console.log(this.products)
    for(let i = 0; i<this.products.length; i++){
     
      this.productDetails =   this.productService.getProductDetail(this.products[i].productId) ;
          this.productDetails.subscribe({
          next: (data : any) => {
            this.isLoading = false; 
          // this.products["Details"].push(data);
          this.productsD.push(data);
            this.products[i].Details = data;
         
            this.products[i].grandTotal = this.products[i].quantity * data.price;
             this.total += this.products[i].grandTotal;
          
          },
          
          error: (error: any) => {
          },
        });  
       
       
       
    } 
        

}
);

     }

  
  ngOnInit():void {
    this.getAlreadyProducts();
  }
  async onSubmit(): Promise<void> {
    // Process checkout data here
for(let i of this.ids){
  let id = this.ids[i]

   this.cartService.clearCart(id)
   .pipe(first())
   .subscribe({
       next: () => {
           // get return url from query parameters or default to home page
           alert("Thank you for your purchase");
           this.router.navigate(['home']);
       },
       error: error => {
           this.alertService.error(error);
       }
   });
   
   
  }
}
 
  


  
}
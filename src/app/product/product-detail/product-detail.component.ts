import { Component } from '@angular/core';
import { Product , ProductService} from '../product.service';
import { first, map, mergeMap, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

isLoading = true ;
 public productDetails!: Observable<Product>;

  constructor(public productService: ProductService,
             private route : ActivatedRoute ){}
 async ngOnInit(){
  this.productDetails = this.route.params.pipe(
    first(),
    map((params) => params['id']),
    mergeMap((id) => this.productService.getProductDetail(id))
  );
      this.productDetails.subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error: any) => {
      
      },
    });
  
}

}
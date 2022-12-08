import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import {MaterialModule} from '../material.module';
import { OrderModule } from 'ngx-order-pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StarRatingComponent } from 'angular-star-rating';
@NgModule({
  imports: [
    CommonModule,
    OrderModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
   
  ],
 declarations: [ProductComponent,ProductDetailComponent],
  exports: [ProductComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ProductModule { }

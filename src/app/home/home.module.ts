import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { ProductModule } from '../product/product.module';
import {MaterialModule} from '../material.module';
import { AlertComponent } from '../alert';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductModule,
    FormsModule,
  ],
  declarations: [HomeComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class HomeModule {}

import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import {MaterialModule} from '../material.module';
import { OrderModule } from 'ngx-order-pipe'; 
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: [
    BrowserModule,
   CommonModule,
    OrderModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
 declarations: [],
 
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class UserModule { }

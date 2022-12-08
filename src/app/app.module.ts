import { NgModule } from '@angular/core';
/* import { FormsModule, ReactiveFormsModule } from '@angular/forms'; */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { Interceptor } from './Interceptor';
import { ErrorInterceptor } from './ErrorInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';

@NgModule({

  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    HomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
    declarations: [
    AppComponent,LoginComponent, SignupComponent, CartComponent , UserComponent  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

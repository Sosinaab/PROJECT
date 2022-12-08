 import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from '../app/product/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth';
 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: '', component: ProductComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent  },
    { path: 'signup', component: SignupComponent },
    { path: 'cart', component: CartComponent },
    { path: 'user/:id', component: UserComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers:[],
})
export class AppRoutingModule { } 
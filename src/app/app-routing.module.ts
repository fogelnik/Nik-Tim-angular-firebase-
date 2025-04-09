import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./pages/product/product.component";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {BasketComponent} from "./pages/basket/basket.component";
import {AddressesComponent} from "./pages/addresses/addresses.component";
import {HomeComponent} from "./pages/dashboard/home/home.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";

const redirectToLogin = () => redirectUnauthorizedTo('/auth/sign-in')
const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'auth/sign-in',
        pathMatch: "full",
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
      },
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/home/home.component')
      .then(m => m.HomeComponent),
    canActivate: [AuthGuard],

    data: {
      authGuardPipe: redirectToLogin
    }
  },
  {
    path: 'basket',
    component: BasketComponent
  },
  {
    path: 'addresses',
    component: AddressesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

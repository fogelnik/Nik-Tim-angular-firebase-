import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./pages/product/product.component";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {BasketComponent} from "./pages/basket/basket.component";

const redirectToLogin = () => redirectUnauthorizedTo('/auth/sign-in')
const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectToLogin
    }
  },
  {
    path: 'basket',
    component: BasketComponent // Добавляем маршрут для BasketComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

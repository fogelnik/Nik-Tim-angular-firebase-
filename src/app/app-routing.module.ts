import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {AuthRoutingModule} from "./pages/auth/auth-routing.module";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectToLogin = () => redirectUnauthorizedTo('/auth/sign-in')
const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

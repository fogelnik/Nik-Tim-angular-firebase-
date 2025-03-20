import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ProductComponent } from './pages/product/product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FooterComponent} from "./pages/footer/footer.component";
import {HeaderComponent} from "./pages/header/header.component";
import { CurrencyModalComponent } from './pages/currency-modal/currency-modal.component';
import {HttpClientModule} from "@angular/common/http";
import { BasketComponent } from './pages/basket/basket.component';
import { ProfileComponent } from './pages/profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    CurrencyModalComponent,
    ProductComponent,
    HttpClientModule,
    BasketComponent,
    ProfileComponent
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({
      "projectId": "nik-tim-angular-firebase-proj",
      "appId": "1:141349795057:web:2acf17f85d4b9f1e19a550",
      "storageBucket": "nik-tim-angular-firebase-proj.firebasestorage.app",
      "apiKey": "AIzaSyBPXTRf1kFWNoPvRythnxrrcBC70OCO1UM",
      "authDomain": "nik-tim-angular-firebase-proj.firebaseapp.com",
      "messagingSenderId": "141349795057"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

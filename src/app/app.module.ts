import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import {ForgotPasswordComponent} from "./pages/auth/forgot-password/forgot-password.component";
import {SignInComponent} from "./pages/auth/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/auth/sign-up/sign-up.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"nik-tim-angular-firebase-proj","appId":"1:141349795057:web:2acf17f85d4b9f1e19a550","storageBucket":"nik-tim-angular-firebase-proj.firebasestorage.app","apiKey":"AIzaSyBPXTRf1kFWNoPvRythnxrrcBC70OCO1UM","authDomain":"nik-tim-angular-firebase-proj.firebaseapp.com","messagingSenderId":"141349795057"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

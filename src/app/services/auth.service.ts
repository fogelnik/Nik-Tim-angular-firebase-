import { Injectable } from '@angular/core';
import {
  Auth, AuthErrorCodes,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public  test = ''
  private googleAuthProvider = new GoogleAuthProvider()

  constructor(
    private auth: Auth,
    private router: Router,
  ) { }

  signInWithEmail(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signInWithGoogle() {
    return signInWithPopup(this.auth,this.googleAuthProvider);
  }

  signUpWithEmail(email: string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  handleError(error: unknown): string{
    if(typeof error === 'object' && error != null && 'message' in error){
      const errorMessage = (error as {message: string}).message;
      if (errorMessage.includes(AuthErrorCodes.INVALID_EMAIL)) {
        return 'Email is not valid';
      }else if (errorMessage.includes('auth/invalid-credential')) {
        return 'Invalid Email/Password';
      }else if (errorMessage.includes(AuthErrorCodes.WEAK_PASSWORD)) {
        return 'Please enter a stronger password';
      }else if (errorMessage.includes(AuthErrorCodes.EMAIL_EXISTS)) {
        return 'The email is already used for another account';
      }
    }
    return 'Something went wrong, please try again.';
    }



  signOut(){
    return signOut(this.auth)
      .then(() => {
        this.router.navigate(['/auth/sign-in']);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
  }

  sendPasswordReset(email: string){
    return sendPasswordResetEmail(this.auth, email);
  }
}

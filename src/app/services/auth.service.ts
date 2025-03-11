import { Injectable } from '@angular/core';
import {
  Auth, AuthErrorCodes,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, User, browserLocalPersistence, onAuthStateChanged
} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private googleAuthProvider = new GoogleAuthProvider();
  private authState = new BehaviorSubject<User | null>(null);
  public authState$ = this.authState.asObservable();
  public userInfo: User | null = null

  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    this.auth.setPersistence(browserLocalPersistence).catch(error => {
      console.error('Ошибка при установке режима сохранения:', error)
    });

    onAuthStateChanged(this.auth, (user) => {
      if(user){
        console.log("User auto-restored:", user)
        this.authState.next(user);
        this.userInfo = user;
      }
    })

    // const user: User | null = this.getUserFromLocalStorage();
    // if (user) {
    //   this.auth.updateCurrentUser(user).catch(error => {
    //     console.error('Ошибка при восстановлении пользователя:', error);
    //   });
    // }
  }

  signInWithEmail(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(credential => {
          this.saveUserToLocalStorage(credential.user);
          this.authState.next(credential.user);
          return credential;
        });
  }

  signInWithGoogle() {
    return signInWithPopup(this.auth,this.googleAuthProvider)
      .then(credential => {
        this.saveUserToLocalStorage(credential.user);
        this.authState.next(credential.user);
        return credential;
      });
  }

  signUpWithEmail(email: string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(credential => {
        this.saveUserToLocalStorage(credential.user);
        this.authState.next(credential.user);
        return credential;
      });
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
        this.clearUserFromLocalStorage();
        this.authState.next(null);
        this.router.navigate(['/auth/sign-in']);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
  }

  sendPasswordReset(email: string){
    return sendPasswordResetEmail(this.auth, email);
  }

  private saveUserToLocalStorage(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private clearUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

}

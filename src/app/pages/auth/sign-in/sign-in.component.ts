import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "@angular/fire/auth"
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
authForm!: FormGroup;

googleAuthProvider = new GoogleAuthProvider

  auth = inject(Auth)

  isSubmissionProgress: boolean = false;
  errorMessage: string = '';


constructor(private router: Router) {
  this.initForm()
}

  initForm() {
        this.authForm = new FormGroup({
          email: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
        })
    }

  onSubmit(){
  if(this.authForm.invalid)
    return
    signInWithEmailAndPassword(this.auth, this.authForm.value.email, this.authForm.value.password)
      .then((response) => {
      this.redirectToDashboardPage();
    })
      .catch(error => {
        console.error('error:', error);
        if(error instanceof Error){
           if(error.message.includes('auth/invalid-email'))
           {
             this.errorMessage = 'Email is not valid'
           }
        }
      })
  }

  onSignInWithGoogle() {
  signInWithPopup(this.auth, this.googleAuthProvider)
    .then(response => {
      this.redirectToDashboardPage();
    })
    .catch (error => {
      console.error('error:', error);
      this.errorMessage = 'Something went wrong, please try again.'
    })
  }
  redirectToDashboardPage(){
    this.router.navigate(['/dashboard'])
  }
}

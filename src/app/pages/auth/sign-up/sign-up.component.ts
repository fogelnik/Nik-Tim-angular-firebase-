import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authForm!: FormGroup;
  errorMessage: string = '';

  get email():string{
    return this.authForm.controls['email'].value;
  }
  get password():string{
    return this.authForm.controls['password'].value;
  }

  constructor( private authService: AuthService, private router: Router) {
    this.initForm()
  }

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(){
    if(this.authForm.invalid){
      this.errorMessage = '';
      if(!this.email && !this.password){
        this.errorMessage = 'Поля пустые';
        return;
      }else if(!this.email){
        this.errorMessage = 'Поле с почтой пустое';
        return;
      }else if(!this.password){
        this.errorMessage = 'После с паролем пустое';
        return;
      }else {
        return;
      }
    }

   this.authService.signUpWithEmail(this.authForm.value.email, this.authForm.value.password)
     .then(response => {
       this.redirectToDashboardPage();
     })
     .catch(error => {
       console.error('error:', error);
       if(typeof error === 'object' && error != 'message' in error){
         const errorMessage = (error as {message: string}).message;
         if(errorMessage.includes('auth/invalid-email')){
           this.errorMessage = 'Email is not valid';
         }else {
           this.errorMessage = 'An unknown error occurred';
         }
       }
     });
  }

  onSignInWithGoogle(){
    this.authService.signInWithGoogle()
      .then(response => {
        this.redirectToDashboardPage()
      })
      .catch(error => {
        console.error('error:', error);
        this.errorMessage = 'Something went wrong, please try again.';
      });
  }
  redirectToDashboardPage(){
    this.router.navigate(['/dashboard'])
  }
}

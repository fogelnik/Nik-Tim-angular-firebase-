import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
authForm!: FormGroup;
errorMessage: string = '';

constructor(private authService: AuthService ,private router: Router) {
  this.initForm()
}

  initForm() {
        this.authForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

  onSubmit() {
    if (this.authForm.invalid) {
      this.errorMessage = '';
      if (!this.authForm.controls['email'].value && !this.authForm.controls['password'].value) {
        this.errorMessage = 'Поля пустые';
        return;
      } else if (!this.authForm.controls['email'].value) {
        this.errorMessage = 'Поле с почтой пустое';
        return;
      } else if (!this.authForm.controls['password'].value) {
        this.errorMessage = 'Поле с паролем пустое';
        return;
      } else {
        return
      }
    }

    this.authService.signInWithEmail(this.authForm.value.email, this.authForm.value.password)
      .then(response => {
        console.error('error:', error);
        this.errorMessage = this.authService.handleError(error)
      })
  }


  onSignInWithGoogle(){
  this.authService.signInWithGoogle()
    .then(response => {
      this.redirectToDashboardPage()
    })
    .catch(error => {
      console.error('error:', error);
      this.errorMessage = 'Something went wrong, please try again.';
    })
  }

  redirectToDashboardPage(){
    this.router.navigate(['/dashboard'])
  }
}

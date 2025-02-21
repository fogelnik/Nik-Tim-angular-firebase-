import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class SignInComponent {
authForm!: FormGroup;
errorMessage: string = '';
passwordVisible: boolean = false; //
  showClearButton: boolean = false;//

  get email():string{
    return this.authForm.controls['email'].value;
  }
  get password():string{
    return this.authForm.controls['password'].value;
  }

constructor(private authService: AuthService ,private router: Router) {
  this.initForm()
}

  initForm() {
        this.authForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  toggleClearButton() {
    this.showClearButton = this.email.length > 0;
  }
  clearEmail() {
    this.authForm.controls['email'].setValue('');
    this.toggleClearButton();
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.errorMessage = '';
      if (!this.email && !this.password) {
        this.errorMessage = 'Поля пустые';
        return;
      } else if (!this.email) {
        this.errorMessage = 'Поле с почтой пустое';
        return;
      } else if (!this.password) {
        this.errorMessage = 'Поле с паролем пустое';
        return;
      } else {
        return;
      }
    }

    this.authService.signInWithEmail(this.authForm.value.email, this.authForm.value.password)
      .then(response => {
        this.redirectToDashboardPage()
      })
      .catch(error => {
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

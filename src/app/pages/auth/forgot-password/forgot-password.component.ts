import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  form!: FormGroup;
  errorMessage: string = '';
  isPasswordResetEmailSent: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if(this.form.invalid) return;

    this.authService.sendPasswordReset(this.form.value.email)
      .then(response => {
        this.isPasswordResetEmailSent = true;
      })
      .catch(error => {
        console.error('error:', error);
      })
  }
}

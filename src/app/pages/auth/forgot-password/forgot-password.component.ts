import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class ForgotPasswordComponent {

  form!: FormGroup;
  errorMessage: string = '';
  isPasswordResetEmailSent: boolean = false;

  get email():string{
    return this.form.controls['email'].value;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if(this.form.invalid){
      this.errorMessage = '';
      if(!this.email){
        this.errorMessage = 'Поле с почтой пустое';
        return;
      }else {
        return;
      }
    }

    this.authService.sendPasswordReset(this.form.value.email)
      .then(response => {
        this.isPasswordResetEmailSent = true;
      })
      .catch(error => {
        console.error('error:', error);
      })
  }
}

import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {last} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

export function passwordsMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }

    return null;
  };
}



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },{validators: passwordsMatchValidator() })


  constructor(private authService: AuthenticationService,
              private router:Router) {}

  ngOnInit(): void{}

  get firstName(){
    return this.signUpForm.get('firstName');
  }

  get lastName(){
    return this.signUpForm.get('lastName');
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  protected readonly last = last;

  submit() {
    const { firstName, lastName, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !firstName || !lastName || !password || !email) {
      return;
    }

    this.authService
        .signUp(email, password)
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
  }
}

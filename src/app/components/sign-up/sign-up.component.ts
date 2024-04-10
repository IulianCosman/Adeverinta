import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {last, switchMap} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

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
    name: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },{validators: passwordsMatchValidator() })


  constructor(private authService: AuthenticationService,
              private router:Router,
              private usersService: UsersService
  ) {}

  ngOnInit(): void{}

  get name(){
    return this.signUpForm.get('name');
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

    if (!this.signUpForm.valid || !name || !password || !email)
    {
      return;
    }

    this.authService
        .signUp( email, password)
        .pipe(
            switchMap(({user:{uid}})=>this.usersService.addUser({uid, email, displayName: name}))
        )
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
  }
}

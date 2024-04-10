import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {authState} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  constructor(private authService: AuthenticationService,
              private router:Router) {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
  ngOnInit(): void{}

  submit(){
    if(!this.loginForm.valid){return;}
    const {email, password } = this.loginForm.value;
    if (email != null && password != null) {
      this.authService.login(email, password)
        .subscribe(() => {
            this.router.navigate(['/home']);
      });
    }
  }
}

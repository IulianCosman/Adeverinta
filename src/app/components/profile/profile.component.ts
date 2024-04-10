import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {user} from "@angular/fire/auth";
import {UsersService} from "../../services/users.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProfileUser} from "../../models/user-profile";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user$ = this.authService.currentUser$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName:new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    university: new FormControl(''),
  });
  constructor(
      private authService: AuthenticationService,
      private usersService: UsersService
  ) {
  }

  ngOnInit(): void{
    this.usersService.currentUserProfile$
        .subscribe((user)=>{
      this.profileForm.patchValue({ ...user});
    })
  }


  saveProfile(){
    const profileData: ProfileUser = {
      uid: this.profileForm.value.uid || '',
      displayName: this.profileForm.value.displayName || '',
      firstName: this.profileForm.value.firstName || '',
      lastName: this.profileForm.value.lastName || '',
      address: this.profileForm.value.address || '',
      university: this.profileForm.value.university || '',
      phone: this.profileForm.value.phone || '',
    };
    this.usersService.updateUser(profileData);


  }
}

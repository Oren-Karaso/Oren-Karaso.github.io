import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/pages/login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedInUser!: User;
  isLogged = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getUser() ?? new User('', 100, []);

    this.loginForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(this.loggedInUser.name, Validators.required),
        'password': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)  // validating according to at least 8 characters containing both digits and characters
        ]),
      }),
    });
  }

}

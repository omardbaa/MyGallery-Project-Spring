import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-compenent',
  templateUrl: './login-compenent.component.html',
  styleUrls: ['./login-compenent.component.css'],
})
export class LoginCompenentComponent implements OnInit {
  userFormGroup!: FormGroup;

  errorMessage: any;

  constructor(
    private accountService: AccountServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    });
  }

  handleLogin() {
    let username = this.userFormGroup.value.username;

    let password = this.userFormGroup.value.password;
    this.accountService.login(username, password).subscribe({
      next: (user) => {
        this.accountService.authenticateUser(user).subscribe({
          next: (data) => {
            this.router.navigate(['files']);
          },
        });
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }
}

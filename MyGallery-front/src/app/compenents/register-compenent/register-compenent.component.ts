import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-compenent',
  templateUrl: './register-compenent.component.html',
  styleUrls: ['./register-compenent.component.css'],
})
export class RegisterCompenentComponent implements OnInit {
  userFormGroup!: FormGroup;

  errorMessage: any;

  constructor(
    private accountService: AccountServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      firstname: this.formBuilder.control(''),
      lastname: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      date: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    });
  }
}

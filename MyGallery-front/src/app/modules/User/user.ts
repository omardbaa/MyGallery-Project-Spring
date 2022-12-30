import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class User {
  id!: string;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
}

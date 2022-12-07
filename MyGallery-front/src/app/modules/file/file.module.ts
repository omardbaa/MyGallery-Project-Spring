import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FileModule {

  id!: number;
  name!: string ;
  type!: string;
  url!: string;
  size!: number;
  description!: string;




 }
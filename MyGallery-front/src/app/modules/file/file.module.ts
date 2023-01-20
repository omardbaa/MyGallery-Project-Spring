import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../Tag/tag';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class FileModule {
  id!: string;
  name!: string;
  type!: string;
  url!: string;
  size!: number;
  extension!: string;
  folder!: number[];
  tags!: string;
  fileUrl!: string;
  displayName!: string;

  downloadUrl!: string;
}

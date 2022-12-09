import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';

const routes: Routes = [



  {path: 'upload-file', component: UploadFileComponent },
  {path: 'files', component: FileListsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

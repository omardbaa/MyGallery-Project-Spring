import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFolderComponent } from './compenents/create-folder/create-folder.component';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { FolderDetailsComponent } from './compenents/folder-details/folder-details.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';

const routes: Routes = [



  {path: 'upload-file', component: UploadFileComponent },
  {path: 'files', component: FileListsComponent},
  {path: 'folders',component : CreateFolderComponent},
  // {path: 'folder-details/:id', component: FolderDetailsComponent},
  {path: 'folders/:id', component: CreateFolderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

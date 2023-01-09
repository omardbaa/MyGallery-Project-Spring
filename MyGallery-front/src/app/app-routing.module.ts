import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFolderComponent } from './compenents/create-folder/create-folder.component';
import { FileDetailsComponent } from './compenents/file-details/file-details.component';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { FolderDetailsComponent } from './compenents/folder-details/folder-details.component';
import { LoginCompenentComponent } from './compenents/login-compenent/login-compenent.component';
import { ProfileComponent } from './compenents/profile/profile.component';
import { RegisterCompenentComponent } from './compenents/register-compenent/register-compenent.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginCompenentComponent },
  { path: 'register', component: RegisterCompenentComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'files', component: FileListsComponent },
  { path: 'folders', component: CreateFolderComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'folder-details/:id', component: FolderDetailsComponent },
  { path: 'file-details/:id', component: FileDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

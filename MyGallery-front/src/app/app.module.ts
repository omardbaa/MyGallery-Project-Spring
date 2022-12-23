import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RenamePipe } from './compenents/file-lists/rename.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';
import { FileDetailsComponent } from './compenents/file-details/file-details.component';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateFolderComponent } from './compenents/update-folder/update-folder.component';
import { CommonModule } from '@angular/common';
import { FolderDetailsComponent } from './compenents/folder-details/folder-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CreateFolderComponent } from './compenents/create-folder/create-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    FileDetailsComponent,
    FileListsComponent,
    RenamePipe,
    CreateFolderComponent,
    UpdateFolderComponent,
    FolderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { FolderModule } from '../modules/folder/folder.module';
import { FileFolder } from '../modules/fileFolder/FileFolder';
import { BASE_URL } from '../Constants';
import { FileModule } from '../modules/file/file.module';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private baseURL = `${BASE_URL}/folder`;

  constructor(private httpClient: HttpClient) {}

  getFolderList(): Observable<FolderModule[]> {
    return this.httpClient.get<FolderModule[]>(`${this.baseURL}`);
  }

  createFolder(folder: FolderModule): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, folder);
  }

  fileFolder(folder: FolderModule, file: FileModule): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/fileToFolder`, {
      folder,
      file,
    });
  }

  getFolderById(id: number): Observable<FolderModule> {
    return this.httpClient.get<FolderModule>(`${this.baseURL}/${id}`);
  }

  updateFolder(id: number, project: FolderModule): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, project);
  }

  deleteFolder(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  deleteFile(fileId: String, folderId: number): Observable<Object> {
    return this.httpClient.delete(
      `${this.baseURL}/deleteFile/${fileId}/${folderId}`
    );
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseURL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.httpClient.request(req);
  }

  getAllFiles(id: number): Observable<FolderModule> {
    return this.httpClient.get<FolderModule>(
      `${this.baseURL}/${id}` + '/files'
    );
  }
}

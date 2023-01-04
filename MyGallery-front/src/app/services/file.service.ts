import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { PaginatedData } from '../modules/FilePage/PaginatedData';
import { FileModule } from '../modules/file/file.module';
import { BASE_URL } from '../Constants';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseURL = `${BASE_URL}/file`;
  constructor(private httpClient: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseURL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.httpClient.request(req);
  }

  //   pageNo
  // pageSize
  // sortBy
  // sortDir

  getFiles(): Observable<PaginatedData<FileModule>> {
    return this.httpClient.get<PaginatedData<FileModule>>(
      `${this.baseURL}/files`
    );
  }

  getAllFiles(pageNo: number): Observable<PaginatedData<FileModule>> {
    return this.httpClient.get<PaginatedData<FileModule>>(
      `${this.baseURL}/files?pageNo` + pageNo
    );
  }

  getFilesByPageNumber(pageNo: number): Observable<PaginatedData<FileModule>> {
    return this.httpClient.get<PaginatedData<FileModule>>(
      `${this.baseURL}/files`,
      { params: { pageNo } }
    );
  }

  file!: FileModule;

  getFileById(id: string): Observable<FileModule> {
    return this.httpClient.get<FileModule>(`${this.baseURL}/files/${id}`);
  }

  updateFile(id: string, file: FileModule): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, file);
  }

  deleteFile(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  deleteTag(fileId: String, tagId: number): Observable<Object> {
    return this.httpClient.delete(
      `${this.baseURL}/deleteTag/${fileId}/${tagId}`
    );
  }

  /*getAllFilesOfFolder(id: number): Observable<FileModule>{
  return this.httpClient.get<FileModule>(`${this.baseURL}/${id}`+'/files');
}*/

  getTags(id: string): Observable<FileModule> {
    return this.httpClient.get<FileModule>(`${this.baseURL}/${id}` + '/tags');
  }
}

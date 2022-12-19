import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { FolderModule } from '../modules/folder/folder.module';

@Injectable({
  providedIn: 'root'
})
export class FolderService {



  private baseURL = "http://localhost:8080/v1/folder";
  constructor(private httpClient: HttpClient) { }



  getFolderList():Observable<FolderModule[]>{

    return this.httpClient.get<FolderModule[]>(`${this.baseURL}`);
  }
  
  createFolder(projct:FolderModule): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, projct);
  }
  
  getFolderById(id: number): Observable<FolderModule>{
    return this.httpClient.get<FolderModule>(`${this.baseURL}/${id}`);
  }
  
  updateFolder(id:number, project: FolderModule): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,project);
  }
  
  deleteFolder(id: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  
  }
  
  
  
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseURL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }
  
  
  getAllFiles(id: number): Observable<FolderModule>{
    return this.httpClient.get<FolderModule>(`${this.baseURL}/${id}`+'/files');
  }
  
  
  }
  
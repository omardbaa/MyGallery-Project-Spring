import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModule } from '../modules/file/file.module';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileService {



  private baseURL = "http://localhost:8080/v1/file";
  constructor(private httpClient: HttpClient) { }



  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
  
    formData.append('file', file);
  
    const req = new HttpRequest('POST', `${this.baseURL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  
    return this.httpClient.request(req);
  }


  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/files`);
  }



getFileById(id: number): Observable<FileModule>{
  return this.httpClient.get<FileModule>(`${this.baseURL}/${id}`);
}

updateFile(id:number, file: FileModule): Observable<Object>{
  return this.httpClient.put(`${this.baseURL}/${id}`,file);
}

deleteFile(id: number):Observable<Object>{
  return this.httpClient.delete(`${this.baseURL}/${id}`);

}






/*getAllFilesOfFolder(id: number): Observable<FileModule>{
  return this.httpClient.get<FileModule>(`${this.baseURL}/${id}`+'/files');
}*/
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { FolderModule } from '../modules/folder/folder.module';
import { FileFolder } from '../modules/fileFolder/FileFolder';
import { BASE_URL } from '../Constants';
import { FileModule } from '../modules/file/file.module';
import { Tag } from '../modules/Tag/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private baseURL = `${BASE_URL}/tag`;

  constructor(private httpClient: HttpClient) {}

  getTagList(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`${this.baseURL}`);
  }

  createTag(tag: Tag): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, tag);
  }

  getTagById(id: number): Observable<Tag> {
    return this.httpClient.get<Tag>(`${this.baseURL}/${id}`);
  }

  updateTag(id: number, tag: Tag): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, tag);
  }

  deleteTag(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getAllFiles(id: number): Observable<Tag> {
    return this.httpClient.get<Tag>(`${this.baseURL}/${id}/files`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { PaginatedData } from '../modules/FilePage/PaginatedData';
import { FileModule } from '../modules/file/file.module';
import { BASE_URL } from '../Constants';
import { USER_KEY } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseURL = `${BASE_URL}/file`;
  constructor(private httpClient: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
      }`,
    });

    const req = new HttpRequest('POST', `${this.baseURL}/upload`, formData, {
      headers,
      responseType: 'text' as 'json',
    });
    return this.httpClient.request(req);
  }

  getFiles(): Observable<PaginatedData<FileModule>> {
    return this.httpClient.get<PaginatedData<FileModule>>(
      `${this.baseURL}/files`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
          }`,
        },
      }
    );
  }

  getAllFiles(pageNo: number): Observable<PaginatedData<FileModule>> {
    return this.httpClient.get<PaginatedData<FileModule>>(
      `${this.baseURL}/files?pageNo` + pageNo,
      {
        responseType: 'text' as 'json',
        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
          }`,
        },
      }
    );
  }

  getFilesByPageNumber(pageNo: number): Observable<PaginatedData<FileModule>> {
    return this.httpClient.get<PaginatedData<FileModule>>(
      `${this.baseURL}/files`,
      {
        params: { pageNo },

        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
          }`,
        },
      }
    );
  }

  file!: FileModule;

  getFileById(id: string): Observable<FileModule> {
    return this.httpClient.get<FileModule>(`${this.baseURL}/files/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
        }`,
      },
    });
  }

  displayFile() {
    return this.httpClient.get(`${this.baseURL}/display/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
        }`,
      },
    });
  }

  updateFile(id: string, file: FileModule): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, file, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
        }`,
      },
    });
  }

  deleteFile(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
        }`,
      },
    });
  }

  deleteTag(fileId: String, tagId: number): Observable<Object> {
    return this.httpClient.delete(
      `${this.baseURL}/deleteTag/${fileId}/${tagId}`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
          }`,
        },
      }
    );
  }

  /*getAllFilesOfFolder(id: number): Observable<FileModule>{
  return this.httpClient.get<FileModule>(`${this.baseURL}/${id}`+'/files');
}*/

  getTags(id: string): Observable<FileModule> {
    return this.httpClient.get<FileModule>(`${this.baseURL}/${id}` + '/tags', {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem(USER_KEY) ?? '{}')?.token
        }`,
      },
    });
  }
}

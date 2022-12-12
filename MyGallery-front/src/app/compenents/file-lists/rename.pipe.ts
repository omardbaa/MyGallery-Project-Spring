import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'rename' })
export class RenamePipe implements PipeTransform {
  transform(typeString: string): string {
    if (typeString === 'application/vnd.ms-excel') {
      return 'fa fa-regular fa-file-excel';
    } else if (typeString === 'image/png') {
      return 'fa fa-light fa-image';
    }else if (typeString === 'text/plain') {
        return "fa-regular fa-file-lines";
      } 
    else {
       return typeString
    }
  }
}
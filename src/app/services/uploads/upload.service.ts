import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImage(fileData) {
    //const url = `the_URL`;
    let input = new FormData();
    input.append('productImage', fileData);
    return this.http.post('/routes/uploads/files', input);
    // .pipe(map(
    //   res => res.json()
    // ));
  }
}

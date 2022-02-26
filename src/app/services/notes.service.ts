import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const notesUrl = '/pinguin/api/notes';

@Injectable()
export class NotesService {
  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get<any>(notesUrl);
  }
  putNotes(id: number) {
    return this.http.get<any>(notesUrl.concat('/{'+id+'}'));
  }
}


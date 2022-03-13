import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const noteLabelsUrl = '/pinguin/api/noteLabels';

@Injectable()
export class NoteLabelsService {
  constructor(private http: HttpClient) { }

  getNoteLabels() {
    return this.http.get<any>(noteLabelsUrl);
  }
}


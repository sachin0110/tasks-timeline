import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../../services/notes.service';
import { NoteLabelsService } from '../../../services/note-labels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ NotesService, NoteLabelsService ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor( private _notesService: NotesService, private _noteLabelService: NoteLabelsService) { }

    ngOnInit() {

      this._notesService.getNotes().subscribe((abc: any)=>{
        console.log(abc);
        return abc;
      }, error=>{
        console.log(error);
        return error;
        
      });


      this._noteLabelService.getNoteLabels().subscribe((abc: any)=>{
        console.log(abc);
        return abc;
      }, error=>{
        console.log(error);
        return error;
        
      });
       
    }


}
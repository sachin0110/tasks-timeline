
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { NotesService } from '../../../services/notes.service';
import { NoteLabelsService } from '../../../services/note-labels.service';
import { Note, NoteLabel, NoteLabelWithNotes } from '../../../interface/note.interface';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NotesService, NoteLabelsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }

      ng-template {
        z-index: 1 !important;
      }
    `,
  ]
})
export class HomeComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  notesList: Array<Note> = [];
  noteLabelList: Array<NoteLabel> = [];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private _notesService: NotesService, private _noteLabelService: NoteLabelsService) {

    this.getNotesLabels();
  }


  getNotesLabels() {
    this._noteLabelService.getNoteLabels().subscribe((noteLabels: any) => {
      console.log(noteLabels);
      this.noteLabelList = noteLabels;
      this.getNotes();
    }, error => {
      console.log(error);

    });
  }

  getNotes() {
    this._notesService.getNotes().subscribe((notes: any) => {
      console.log(notes);
      this.notesList;
      ;
      this.parseNotestoEvents(this.mergeNotesIntoLabels(this.noteLabelList, notes.notes));
    }, error => {
      console.log(error);

    });
  }

  // teamDropdownChanged(index: number) {
  //   switch(index) {
      
  //     case 1:
  //       this.events = this.events.filter((event) => event.id === 1 );
  //     break;
  //     case 2:
  //       this.events = this.events.filter((event) => event.id === 2 );
  //     break;
  //     case 3:
  //       this.events = this.events.filter((event) => event.id === 3 );
  //     break;
  //     default:
  //       this.events = [
  //         ...this.events];
  //       break;
  //   }
  //   console.log(this.events);
    
  // }

  mergeNotesIntoLabels(noteLabelsList: Array<NoteLabel>, notesList: Array<Note>) {

    const noteLabelWithNotesList: Array<NoteLabelWithNotes> = [];
        notesList.forEach((note: Note)=>{
          // const notesLabel: Array<NoteLabelWithNotes> = [];
          note.labels.forEach((noteLabelOfNote)=>{
            noteLabelsList.forEach((noteLabel: NoteLabel)=>{
              if(noteLabel.id===noteLabelOfNote) {
                noteLabelWithNotesList.push({
                  id: note.id,
                  labelId: noteLabel.id,
                  text: noteLabel.text,
                  title: note.title,
                  startDate: note.startDate,
                  endDate: note.endDate,
                  color: noteLabel.id===1?colors.red:noteLabel.id===2?colors.green:colors.yellow
                })
              }
            })
          })
    })
    return noteLabelWithNotesList;
  }

  parseNotestoEvents(notes: Array<NoteLabelWithNotes>) {
    console.log(notes);
    for (let i = 0; i < notes.length; i++) {

      this.events.push({
        id: notes[i].labelId,
        title: notes[i].text.concat(': '+notes[i].title),
        start: startOfDay(new Date(notes[i].startDate * 1000)),
        end: endOfDay(new Date(notes[i].endDate * 1000)),
        color: notes[i].color
      });
    }
    console.log(this.events);

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }


  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
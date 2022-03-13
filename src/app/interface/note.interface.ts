export interface Note {
    id: number,
    title: string,
    startDate: number,
    endDate: number,
    labels: Array<number>,
}

export interface NoteLabel {
    id: number,
    text: String

}

export interface NoteLabelWithNotes {
    id: number,
    labelId: number
    text: String,
    title: string,
    startDate: number,
    endDate: number,
    color: any
}

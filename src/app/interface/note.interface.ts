export interface Note {
    id: Number,
    title: string,
    startDate: number,
    endDate: number,
    labels: Array<Number>,
}

export interface NoteLabel {
    id: Number,
    text: String

}

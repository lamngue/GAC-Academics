import { Student } from './student';

export interface Question {
    id: string,
    dateAdded: string,
    topic: string,
    question: string,
    by: string,
    likedBy: Student[],
    content: string,
    comments: Object[]
}
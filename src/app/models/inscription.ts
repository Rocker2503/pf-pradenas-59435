import { Course } from "./course";
import { Student } from "./student";

export interface Inscription{
    id: string,
    studentId: string,
    courseId: string,
    student?: Student,
    course?: Course,
}
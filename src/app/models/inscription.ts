import { Course } from "./course";
import { User } from "./user";

export interface Inscription{
    id: string,
    userId: string,
    courseId: string,
    user?: User,
    course?: Course,
}
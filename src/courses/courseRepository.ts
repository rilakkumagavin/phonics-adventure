import type { LetterCourse } from '../types/course';
import { courses, coursesById, coursesByLetter } from './courseIndex';

export function getAllCourses(): LetterCourse[] {
  return [...courses];
}

export function getCourseById(id: string): LetterCourse | undefined {
  return coursesById.get(id);
}

export function getCourseByLetter(letter: string): LetterCourse | undefined {
  return coursesByLetter.get(letter.toLowerCase());
}

export function getAvailableCourseIds(): string[] {
  return courses.map((course) => course.id);
}

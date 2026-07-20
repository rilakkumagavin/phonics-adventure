import type { LetterCourse } from '../types/course';
import { letterACourse } from './data/a';
import { letterBCourse } from './data/b';
import { letterCCourse } from './data/c';
import { letterDCourse } from './data/d';
import { letterECourse } from './data/e';
import { letterFCourse } from './data/f';
import { letterGCourse } from './data/g';
import { letterHCourse } from './data/h';
import { letterICourse } from './data/i';
import { letterJCourse } from './data/j';
import { letterKCourse } from './data/k';
import { letterLCourse } from './data/l';
import { letterMCourse } from './data/m';
import { letterNCourse } from './data/n';
import { letterOCourse } from './data/o';
import { letterPCourse } from './data/p';
import { letterQCourse } from './data/q';
import { letterRCourse } from './data/r';
import { letterSCourse } from './data/s';
import { letterTCourse } from './data/t';
import { letterUCourse } from './data/u';
import { letterVCourse } from './data/v';
import { letterWCourse } from './data/w';
import { letterXCourse } from './data/x';
import { letterYCourse } from './data/y';
import { letterZCourse } from './data/z';

export const courses = [
  letterACourse,
  letterBCourse,
  letterCCourse,
  letterDCourse,
  letterECourse,
  letterFCourse,
  letterGCourse,
  letterHCourse,
  letterICourse,
  letterJCourse,
  letterKCourse,
  letterLCourse,
  letterMCourse,
  letterNCourse,
  letterOCourse,
  letterPCourse,
  letterQCourse,
  letterRCourse,
  letterSCourse,
  letterTCourse,
  letterUCourse,
  letterVCourse,
  letterWCourse,
  letterXCourse,
  letterYCourse,
  letterZCourse,
] as const satisfies readonly LetterCourse[];

export const coursesById = new Map<string, LetterCourse>(
  courses.map((course) => [course.id, course]),
);

export const coursesByLetter = new Map<string, LetterCourse>(
  courses.flatMap((course) => [
    [course.letter.uppercase.toLowerCase(), course],
    [course.letter.lowercase.toLowerCase(), course],
  ]),
);

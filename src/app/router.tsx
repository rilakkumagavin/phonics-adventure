import { createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from './App';
import { CompletePage } from '../pages/CompletePage/CompletePage';
import { DecodableSentencePage } from '../pages/DecodableSentencePage/DecodableSentencePage';
import { GamePage } from '../pages/GamePage/GamePage';
import { GradeThreeMapPage } from '../pages/GradeThreeMapPage/GradeThreeMapPage';
import { GradeTwoMapPage } from '../pages/GradeTwoMapPage/GradeTwoMapPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { LearningMapPage } from '../pages/LearningMapPage/LearningMapPage';
import { LessonPage } from '../pages/LessonPage/LessonPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { ProgressPage } from '../pages/ProgressPage/ProgressPage';
import { ShortVowelLessonPage } from '../pages/ShortVowelLessonPage/ShortVowelLessonPage';
import { TodayTaskPage } from '../pages/TodayTaskPage/TodayTaskPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'map', element: <LearningMapPage /> },
      { path: 'today', element: <TodayTaskPage /> },
      { path: 'lesson/:letterId', element: <LessonPage /> },
      { path: 'game/:gameId', element: <GamePage /> },
      { path: 'grade/2', element: <GradeTwoMapPage /> },
      { path: 'grade/3', element: <GradeThreeMapPage /> },
      {
        path: 'grade/2/short-vowels/a',
        element: <Navigate replace to="/grade/2/lesson/short-a" />,
      },
      {
        path: 'grade/2/lesson/:lessonSlug',
        element: <ShortVowelLessonPage />,
      },
      {
        path: 'grade/3/lesson/:lessonSlug',
        element: <ShortVowelLessonPage grade={3} />,
      },
      {
        path: 'grade/3/read/:lessonSlug',
        element: <DecodableSentencePage grade={3} />,
      },
      {
        path: 'grade/2/sentence/:lessonSlug',
        element: <DecodableSentencePage />,
      },
      { path: 'complete', element: <CompletePage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

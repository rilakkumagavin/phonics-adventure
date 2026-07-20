import { Link } from 'react-router-dom';

import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { getAllCourses } from '../../courses/courseRepository';
import {
  getLearningProgressSummary,
  loadLearningProgress,
} from '../../progress/learningProgress';
import styles from './HomePage.module.css';

export function HomePage() {
  const courses = getAllCourses();
  const progress = loadLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const nextCourse =
    courses.find(
      (course) => !progress.letters[course.letter.lowercase]?.completed,
    ) ?? courses[0];
  const previewWord = nextCourse.words.find((word) => word.isCore) ?? nextCourse.words[0];

  return (
    <div className={styles.page}>
      <section className={styles.startSection} aria-labelledby="start-title">
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>今天只學三個字</p>
          <h2 id="start-title">
            聽一聽，跟著念，
            <br />
            再自己讀一次。
          </h2>
          <p className={styles.description}>
            從 {nextCourse.letter.uppercase} 開始，一次專心看一個字。
          </p>
          <div className={styles.actions}>
            <Link
              className={styles.primaryAction}
              to={`/lesson/${nextCourse.letter.lowercase}`}
            >
              開始學 {nextCourse.letter.uppercase}
            </Link>
            <Link className={styles.secondaryAction} to="/map">
              選其他字母
            </Link>
          </div>
        </div>

        <div className={styles.preview} aria-label="下一個學習單字">
          <img src={previewWord.image.src} alt={previewWord.image.alt} />
          <strong>{previewWord.displayWord}</strong>
        </div>
      </section>

      <section className={styles.progress} aria-labelledby="learning-progress">
        <div className={styles.progressHeading}>
          <div>
            <p className={styles.eyebrow}>我的學習</p>
            <h2 id="learning-progress">
              已完成 {summary.completedLetters} / {summary.totalLetters} 個字母
            </h2>
          </div>
          <Link to="/progress">查看進度</Link>
        </div>
        <div className={styles.progressList}>
          <ProgressBar label="聽" value={summary.listening} />
          <ProgressBar label="說" value={summary.speaking} />
          <ProgressBar label="讀" value={summary.reading} />
        </div>
      </section>
    </div>
  );
}

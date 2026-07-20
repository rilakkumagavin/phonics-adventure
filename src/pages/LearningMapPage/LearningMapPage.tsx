import { Link } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { getAllCourses } from '../../courses/courseRepository';
import { loadLearningProgress } from '../../progress/learningProgress';
import styles from './LearningMapPage.module.css';

export function LearningMapPage() {
  const courses = getAllCourses();
  const progress = loadLearningProgress();
  const lastLetter = courses.at(-1)?.letter.uppercase ?? 'A';

  return (
    <div>
      <PageHeader
        title="學習地圖"
        description={`A 到 ${lastLetter} 的課程都可以進入，先從熟悉的聲音開始慢慢練習。`}
      />

      <section className={styles.grid} aria-label={`A 到 ${lastLetter} 字母關卡`}>
        {courses.map((course) => {
          const letter = course.letter.lowercase;
          const isCompleted = progress.letters[letter]?.completed ?? false;
          const cardClass = `${styles.card} ${isCompleted ? styles.completed : ''}`;

          return (
            <article key={course.id} className={cardClass}>
              <div className={styles.letter} aria-hidden="true">
                {course.letter.uppercase}
              </div>
              <h3>{course.title}</h3>
              <p>{isCompleted ? '已完成，之後會再複習' : '可以開始'}</p>
              <Link className={styles.action} to={`/lesson/${letter}`}>
                進入課程
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}

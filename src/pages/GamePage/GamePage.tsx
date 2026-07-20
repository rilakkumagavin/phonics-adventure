import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { useAudioPlayer } from '../../audio/useAudioPlayer';
import { useVoiceRecorder } from '../../audio/useVoiceRecorder';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { getCourseByLetter } from '../../courses/courseRepository';
import type {
  CourseActivity,
  LetterImageMatchActivity,
  ListenAndChooseActivity,
  ReadAndChooseActivity,
  RecordAndPlaybackActivity,
  SoundSortActivity,
} from '../../types/activity';
import type { LetterCourse } from '../../types/course';
import styles from './GamePage.module.css';

function getWordLabel(course: LetterCourse, wordId: string) {
  return course?.words.find((word) => word.id === wordId)?.displayWord ?? wordId;
}

function getChoiceLabel(choice: ListenAndChooseActivity['choices'][number]) {
  return choice.image.alt;
}

function createCompletePath(
  letterId: string,
  activityId: string,
  skill: 'listening' | 'speaking' | 'reading',
  mistakeCount = 0,
) {
  const params = new URLSearchParams({
    activityId,
    letterId,
    skill,
  });

  if (mistakeCount > 0) {
    params.set('mistakes', String(mistakeCount));
  }

  return `/complete?${params.toString()}`;
}

function createGamePath(
  gameId: CourseActivity['type'],
  course: LetterCourse,
  activityId?: string,
) {
  const params = new URLSearchParams({ letterId: course.letter.lowercase });

  if (activityId) {
    params.set('activityId', activityId);
  }

  return `/game/${gameId}?${params.toString()}`;
}

function UnsupportedGame({ gameId }: { gameId?: string }) {
  return (
    <div className={styles.page}>
      <PageHeader
        title="遊戲尚未開放"
        description={`遊戲容器：${gameId ?? 'unknown'}。請先從課程頁選擇已開放的活動。`}
      />

      <section className={styles.panel} aria-labelledby="game-progress">
        <h2 id="game-progress">請先從已開放的遊戲開始</h2>
        <p>一次只建立一個遊戲引擎，後續再接上其他活動。</p>
      </section>

      <div className={styles.actions}>
        <Link className={styles.primaryAction} to="/game/listen-and-choose">
          前往聽音選圖
        </Link>
        <Link className={styles.secondaryButton} to="/game/letter-image-match">
          前往字母配對
        </Link>
        <Link className={styles.secondaryButton} to="/game/record-and-playback">
          前往錄音回放
        </Link>
        <Link className={styles.secondaryButton} to="/game/sound-sort">
          前往聲音分類
        </Link>
        <Link className={styles.secondaryButton} to="/game/read-and-choose">
          前往看字選答案
        </Link>
      </div>
    </div>
  );
}

function ListenAndChooseGame({
  activity,
  course,
}: {
  activity: ListenAndChooseActivity;
  course: LetterCourse;
}) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [message, setMessage] = useState('先聽聲音，再選一張圖片。');
  const { playAudio, state: audioState } = useAudioPlayer();

  const selectedChoice = activity.choices.find(
    (choice) => choice.id === selectedChoiceId,
  );
  const isComplete = Boolean(selectedChoice?.isCorrect);

  async function handlePromptAudio() {
    const result = await playAudio(activity.promptAudio, {
      label: course.letter.uppercase,
      playbackRate: 1,
    });

    if (result.status !== 'cancelled') {
      setMessage(result.message);
    }
  }

  function handleChoice(choice: ListenAndChooseActivity['choices'][number]) {
    setSelectedChoiceId(choice.id);

    if (choice.isCorrect) {
      setMessage(`答對了！你找到有 ${course.letter.uppercase} 聲音的圖片。`);
      return;
    }

    setMistakeCount((count) => count + 1);
    setMessage(`再試一次。聽聽這張圖片有沒有 ${course.letter.uppercase} 聲音。`);
  }

  return (
    <div className={styles.page}>
      <PageHeader title={activity.title} description={activity.studentInstruction}>
        <Link
          className={styles.secondaryButton}
          to={`/lesson/${course.letter.lowercase}`}
        >
          回到 {course.letter.uppercase} 課程
        </Link>
      </PageHeader>

      <section className={styles.panel} aria-labelledby="game-progress">
        <p className={styles.kicker}>聽音選圖</p>
        <h2 id="game-progress">{message}</h2>
        <button
          type="button"
          className={styles.soundButton}
          disabled={audioState.status === 'loading'}
          onClick={() => {
            void handlePromptAudio();
          }}
        >
          播放題目聲音
        </button>
      </section>

      <section className={styles.options} aria-label="圖片選項">
        {activity.choices.map((choice) => {
          const isSelected = choice.id === selectedChoiceId;
          const label = getChoiceLabel(choice);

          return (
            <button
              key={choice.id}
              type="button"
              className={[
                styles.optionCard,
                isSelected ? styles.optionCardSelected : '',
                isSelected && choice.isCorrect ? styles.optionCardCorrect : '',
                isSelected && !choice.isCorrect ? styles.optionCardWrong : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isSelected}
              onClick={() => handleChoice(choice)}
            >
              <span className={styles.optionImageFrame}>
                <img
                  className={styles.optionImage}
                  src={choice.image.src}
                  alt={label}
                />
              </span>
              <span>選這張圖片</span>
            </button>
          );
        })}
      </section>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            setSelectedChoiceId(null);
            setMistakeCount(0);
            setMessage('先聽聲音，再選一張圖片。');
          }}
        >
          再玩一次
        </button>
        <Link
          className={isComplete ? styles.primaryAction : styles.primaryActionDisabled}
          aria-disabled={!isComplete}
          to={
            isComplete
              ? createCompletePath(
                  course.letter.lowercase,
                  activity.id,
                  'listening',
                  mistakeCount,
                )
              : '#'
          }
        >
          完成遊戲
        </Link>
      </div>
    </div>
  );
}

function LetterImageMatchGame({
  activity,
  course,
}: {
  activity: LetterImageMatchActivity;
  course: LetterCourse;
}) {
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const initialMessage = `看 ${course.letter.uppercase} 或 ${course.letter.lowercase}，找出有 ${course.letter.uppercase} 聲音的圖片。`;
  const [message, setMessage] = useState(initialMessage);
  const isComplete = matchedPairIds.length === activity.pairs.length;

  function handlePair(pair: LetterImageMatchActivity['pairs'][number]) {
    if (matchedPairIds.includes(pair.id)) {
      setMessage(`${getWordLabel(course, pair.wordId)} 已經配對完成。`);
      return;
    }

    const nextMatchedPairIds = [...matchedPairIds, pair.id];

    setMatchedPairIds(nextMatchedPairIds);
    setMessage(
      nextMatchedPairIds.length === activity.pairs.length
        ? `全部配對完成！${course.letter.uppercase} 可以連到這些圖片。`
        : `配對成功：${pair.letter} 和 ${getWordLabel(course, pair.wordId)}。`,
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader title={activity.title} description={activity.studentInstruction}>
        <Link
          className={styles.secondaryButton}
          to={`/lesson/${course.letter.lowercase}`}
        >
          回到 {course.letter.uppercase} 課程
        </Link>
      </PageHeader>

      <section className={styles.panel} aria-labelledby="game-progress">
        <p className={styles.kicker}>字母與圖片配對</p>
        <div className={styles.letterTiles} aria-label="目標字母">
          <span>{course.letter.uppercase}</span>
          <span>{course.letter.lowercase}</span>
        </div>
        <h2 id="game-progress">{message}</h2>
      </section>

      <section className={styles.options} aria-label="圖片配對選項">
        {activity.pairs.map((pair) => {
          const isMatched = matchedPairIds.includes(pair.id);

          return (
            <button
              key={pair.id}
              type="button"
              className={[styles.optionCard, isMatched ? styles.optionCardCorrect : '']
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isMatched}
              onClick={() => handlePair(pair)}
            >
              <span className={styles.pairLetter} aria-label={`字母 ${pair.letter}`}>
                {pair.letter}
              </span>
              <span className={styles.optionImageFrame}>
                <img
                  className={styles.optionImage}
                  src={pair.image.src}
                  alt={pair.image.alt}
                />
              </span>
              <span>{getWordLabel(course, pair.wordId)}</span>
            </button>
          );
        })}
      </section>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            setMatchedPairIds([]);
            setMessage(initialMessage);
          }}
        >
          再玩一次
        </button>
        <Link
          className={isComplete ? styles.primaryAction : styles.primaryActionDisabled}
          aria-disabled={!isComplete}
          to={
            isComplete
              ? createCompletePath(course.letter.lowercase, activity.id, 'reading')
              : '#'
          }
        >
          完成遊戲
        </Link>
      </div>
    </div>
  );
}

function RecordAndPlaybackGame({
  activity,
  course,
}: {
  activity: RecordAndPlaybackActivity;
  course: LetterCourse;
}) {
  const [message, setMessage] = useState(activity.recordingPrompt);
  const { playAudio, state: audioState } = useAudioPlayer();
  const recorder = useVoiceRecorder();
  const isComplete = Boolean(recorder.state.audioUrl);

  async function handleModelAudio(playbackRate: number) {
    const result = await playAudio(activity.modelAudio, {
      label: course.letter.uppercase,
      playbackRate,
    });

    if (result.status !== 'cancelled') {
      setMessage(result.message);
    }
  }

  async function handleStartRecording() {
    await recorder.startRecording();
    setMessage(`開始錄音，${activity.recordingPrompt}`);
  }

  function handleStopRecording() {
    recorder.stopRecording();
    setMessage('錄音完成後，可以聽聽自己的聲音。');
  }

  async function handlePlayRecording() {
    await recorder.playRecording();
    setMessage('正在播放你的錄音。');
  }

  function handleResetRecording() {
    recorder.resetRecording();
    setMessage(activity.recordingPrompt);
  }

  const recorderMessage =
    recorder.state.errorMessage ??
    (recorder.state.status === 'requesting' ? '正在開啟麥克風。' : message);
  const isRecording = recorder.state.status === 'recording';
  const isRecorderBusy = isRecording || recorder.state.status === 'requesting';

  return (
    <div className={styles.page}>
      <PageHeader title={activity.title} description={activity.studentInstruction}>
        <Link
          className={styles.secondaryButton}
          to={`/lesson/${course.letter.lowercase}`}
        >
          回到 {course.letter.uppercase} 課程
        </Link>
      </PageHeader>

      <section className={styles.panel} aria-labelledby="game-progress">
        <p className={styles.kicker}>錄音與回放</p>
        <h2 id="game-progress">{recorderMessage}</h2>
        <p className={styles.helperText}>
          先聽正確發音，再跟著念。這裡不做語音辨識或發音評分，也不會上傳錄音。
        </p>
      </section>

      <section className={styles.recorderPanel} aria-label="錄音控制">
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.soundButton}
            disabled={audioState.status === 'loading'}
            onClick={() => {
              void handleModelAudio(1);
            }}
          >
            播放正確發音
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={audioState.status === 'loading'}
            onClick={() => {
              void handleModelAudio(0.75);
            }}
          >
            慢速發音
          </button>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryAction}
            disabled={isRecorderBusy}
            onClick={() => {
              void handleStartRecording();
            }}
          >
            {recorder.state.status === 'requesting' ? '正在開啟麥克風' : '開始錄音'}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={!isRecording}
            onClick={handleStopRecording}
          >
            停止錄音
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={!recorder.state.audioUrl || recorder.state.status === 'playing'}
            onClick={() => {
              void handlePlayRecording();
            }}
          >
            播放我的錄音
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={!recorder.state.audioUrl}
            onClick={handleResetRecording}
          >
            重新錄音
          </button>
        </div>

        <p className={styles.helperText}>
          錄音狀態：
          <span className={styles.statusText}>{recorder.state.status}</span>
        </p>
      </section>

      <div className={styles.actions}>
        <Link
          className={styles.secondaryButton}
          to={createGamePath('letter-image-match', course)}
        >
          回到字母配對
        </Link>
        <Link
          className={isComplete ? styles.primaryAction : styles.primaryActionDisabled}
          aria-disabled={!isComplete}
          to={
            isComplete
              ? createCompletePath(course.letter.lowercase, activity.id, 'speaking')
              : '#'
          }
        >
          完成遊戲
        </Link>
      </div>
    </div>
  );
}

function SoundSortGame({
  activity,
  course,
}: {
  activity: SoundSortActivity;
  course: LetterCourse;
}) {
  const [selectedGroups, setSelectedGroups] = useState<Record<string, string>>({});
  const [mistakeCount, setMistakeCount] = useState(0);
  const [message, setMessage] = useState('看看圖片，幫它找到聲音朋友。');

  const correctCount = activity.items.filter(
    (item) => selectedGroups[item.id] === item.targetGroupId,
  ).length;
  const isComplete = correctCount === activity.items.length;

  function handleSort(item: SoundSortActivity['items'][number], groupId: string) {
    const nextSelectedGroups = {
      ...selectedGroups,
      [item.id]: groupId,
    };
    const group = activity.groups.find((candidate) => candidate.id === groupId);

    setSelectedGroups(nextSelectedGroups);

    if (groupId === item.targetGroupId) {
      const nextCorrectCount = activity.items.filter(
        (candidate) => nextSelectedGroups[candidate.id] === candidate.targetGroupId,
      ).length;

      setMessage(
        nextCorrectCount === activity.items.length
          ? `全部分類完成！你找到 ${course.letter.uppercase} 的聲音朋友了。`
          : `${getWordLabel(course, item.wordId)} 放到 ${group?.label ?? '這一類'}。`,
      );
      return;
    }

    setMistakeCount((count) => count + 1);
    setMessage(`再試一次。先想想這張圖片有沒有 ${course.letter.uppercase} 聲音。`);
  }

  return (
    <div className={styles.page}>
      <PageHeader title={activity.title} description={activity.studentInstruction}>
        <Link
          className={styles.secondaryButton}
          to={`/lesson/${course.letter.lowercase}`}
        >
          回到 {course.letter.uppercase} 課程
        </Link>
      </PageHeader>

      <section className={styles.panel} aria-labelledby="game-progress">
        <p className={styles.kicker}>聲音分類</p>
        <div className={styles.sortGroups} aria-label="分類目標">
          {activity.groups.map((group) => (
            <span key={group.id}>{group.label}</span>
          ))}
        </div>
        <h2 id="game-progress">{message}</h2>
        <p className={styles.helperText}>
          已分類 {correctCount} / {activity.items.length}
        </p>
      </section>

      <section className={styles.sortItems} aria-label="聲音分類圖片">
        {activity.items.map((item) => {
          const selectedGroupId = selectedGroups[item.id];
          const isCorrect = selectedGroupId === item.targetGroupId;
          const isWrong = Boolean(selectedGroupId) && !isCorrect;

          return (
            <article
              key={item.id}
              className={[
                styles.sortCard,
                isCorrect ? styles.optionCardCorrect : '',
                isWrong ? styles.optionCardWrong : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.optionImageFrame}>
                <img
                  className={styles.optionImage}
                  src={item.image.src}
                  alt={item.image.alt}
                />
              </span>
              <strong>{getWordLabel(course, item.wordId)}</strong>
              <div className={styles.sortButtons}>
                {activity.groups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    className={
                      selectedGroupId === group.id
                        ? styles.primaryAction
                        : styles.secondaryButton
                    }
                    aria-pressed={selectedGroupId === group.id}
                    onClick={() => handleSort(item, group.id)}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            setSelectedGroups({});
            setMistakeCount(0);
            setMessage('看看圖片，幫它找到聲音朋友。');
          }}
        >
          再玩一次
        </button>
        <Link
          className={isComplete ? styles.primaryAction : styles.primaryActionDisabled}
          aria-disabled={!isComplete}
          to={
            isComplete
              ? createCompletePath(
                  course.letter.lowercase,
                  activity.id,
                  'listening',
                  mistakeCount,
                )
              : '#'
          }
        >
          完成遊戲
        </Link>
      </div>
    </div>
  );
}

function ReadAndChooseGame({
  activity,
  course,
}: {
  activity: ReadAndChooseActivity;
  course: LetterCourse;
}) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const initialMessage = '先讀讀看，再選出單字的意思。';
  const [message, setMessage] = useState(initialMessage);
  const selectedChoice = activity.choices.find(
    (choice) => choice.id === selectedChoiceId,
  );
  const isComplete = Boolean(selectedChoice?.isCorrect);

  function handleChoice(choice: ReadAndChooseActivity['choices'][number]) {
    setSelectedChoiceId(choice.id);
    if (!choice.isCorrect) {
      setMistakeCount((count) => count + 1);
    }
    setMessage(
      choice.isCorrect
        ? `答對了！${activity.promptText} 就是「${choice.text}」。`
        : '再讀一次，想想這個單字是哪一個意思。',
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader title={activity.title} description={activity.studentInstruction}>
        <Link
          className={styles.secondaryButton}
          to={`/lesson/${course.letter.lowercase}`}
        >
          回到 {course.letter.uppercase} 課程
        </Link>
      </PageHeader>

      <section className={styles.panel} aria-labelledby="game-progress">
        <p className={styles.kicker}>看字選答案</p>
        <p className={styles.readPrompt}>{activity.promptText}</p>
        <h2 id="game-progress">{message}</h2>
      </section>

      <section className={styles.textOptions} aria-label="單字意思選項">
        {activity.choices.map((choice) => {
          const isSelected = choice.id === selectedChoiceId;

          return (
            <button
              key={choice.id}
              type="button"
              className={[
                styles.optionCard,
                styles.textOption,
                isSelected ? styles.optionCardSelected : '',
                isSelected && choice.isCorrect ? styles.optionCardCorrect : '',
                isSelected && !choice.isCorrect ? styles.optionCardWrong : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isSelected}
              onClick={() => handleChoice(choice)}
            >
              {choice.text}
            </button>
          );
        })}
      </section>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => {
            setSelectedChoiceId(null);
            setMistakeCount(0);
            setMessage(initialMessage);
          }}
        >
          再玩一次
        </button>
        <Link
          className={isComplete ? styles.primaryAction : styles.primaryActionDisabled}
          aria-disabled={!isComplete}
          to={
            isComplete
              ? createCompletePath(
                  course.letter.lowercase,
                  activity.id,
                  'reading',
                  mistakeCount,
                )
              : '#'
          }
        >
          完成遊戲
        </Link>
      </div>
    </div>
  );
}

export function GamePage() {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const letterId = searchParams.get('letterId')?.toLowerCase() ?? 'a';
  const activityId = searchParams.get('activityId');
  const course = useMemo(() => getCourseByLetter(letterId), [letterId]);
  const activity = useMemo(() => {
    if (!course) {
      return undefined;
    }

    if (activityId) {
      const selectedActivity = course.activities.find(
        (candidate) => candidate.id === activityId,
      );

      return selectedActivity?.type === gameId ? selectedActivity : undefined;
    }

    if (gameId === 'listen-and-choose') {
      const initialSoundActivity = course.activities.find(
        (candidate) =>
          candidate.type === gameId && candidate.id.includes('initial-sound'),
      );

      if (initialSoundActivity) {
        return initialSoundActivity;
      }
    }

    return course.activities.find((candidate) => candidate.type === gameId);
  }, [activityId, course, gameId]);

  if (!course) {
    return <UnsupportedGame gameId={gameId} />;
  }

  if (gameId === 'listen-and-choose' && activity?.type === 'listen-and-choose') {
    return (
      <ListenAndChooseGame key={activity.id} activity={activity} course={course} />
    );
  }

  if (gameId === 'letter-image-match' && activity?.type === 'letter-image-match') {
    return (
      <LetterImageMatchGame key={activity.id} activity={activity} course={course} />
    );
  }

  if (gameId === 'record-and-playback' && activity?.type === 'record-and-playback') {
    return (
      <RecordAndPlaybackGame key={activity.id} activity={activity} course={course} />
    );
  }

  if (gameId === 'sound-sort' && activity?.type === 'sound-sort') {
    return <SoundSortGame key={activity.id} activity={activity} course={course} />;
  }

  if (gameId === 'read-and-choose' && activity?.type === 'read-and-choose') {
    return <ReadAndChooseGame key={activity.id} activity={activity} course={course} />;
  }

  return <UnsupportedGame gameId={gameId} />;
}

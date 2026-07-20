import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getAllCourses } from '../../courses/courseRepository';
import { GamePage } from './GamePage';

function renderGame(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </MemoryRouter>,
  );
}

function getImageButton(alt: string) {
  const image = screen.getByRole('img', { name: alt });
  const button = image.closest('button');

  if (!button) {
    throw new Error(`Image ${alt} should be inside a button.`);
  }

  return button;
}

function getImageCard(alt: string) {
  const image = screen.getByRole('img', { name: alt });
  const card = image.closest('article');

  if (!card) {
    throw new Error(`Image ${alt} should be inside an article.`);
  }

  return card;
}

const activityRouteCases = getAllCourses().flatMap((course) =>
  course.activities.map((activity) => ({
    activity,
    letterId: course.letter.lowercase,
    uppercaseLetter: course.letter.uppercase,
  })),
);

describe('GamePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    Reflect.deleteProperty(globalThis, 'MediaRecorder');
  });

  it.each(activityRouteCases)(
    '$uppercaseLetter 的 $activity.type 活動可由正式識別碼載入',
    ({ activity, letterId, uppercaseLetter }) => {
      renderGame(
        `/game/${activity.type}?letterId=${letterId}&activityId=${activity.id}`,
      );

      expect(screen.getByRole('heading', { name: activity.title })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: `回到 ${uppercaseLetter} 課程` }),
      ).toHaveAttribute('href', `/lesson/${letterId}`);
    },
  );

  it('/game/listen-and-choose 使用 A 課程聽音選圖資料', () => {
    const { container } = renderGame('/game/listen-and-choose');

    expect(
      screen.getByRole('heading', { name: '找出 A 開頭的聲音' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('聽 A 的短短聲音，找出 A 開頭的圖片。'),
    ).toBeInTheDocument();
    expect(screen.getByText('先聽聲音，再選一張圖片。')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '播放題目聲音' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到 A 課程' })).toHaveAttribute(
      'href',
      '/lesson/a',
    );

    expect(screen.getByRole('img', { name: '一顆帶著綠葉的紅蘋果' })).toHaveAttribute(
      'src',
      '/assets/images/courses/a/a-apple-core.webp',
    );
    expect(screen.getByRole('img', { name: '一顆彩色球' })).toHaveAttribute(
      'src',
      '/assets/images/shared/shared-ball-core.webp',
    );
    expect(screen.getByRole('img', { name: '一隻友善的小貓' })).toHaveAttribute(
      'src',
      '/assets/images/shared/shared-cat-core.webp',
    );
    expect(screen.getByRole('img', { name: '一隻友善的小狗' })).toHaveAttribute(
      'src',
      '/assets/images/shared/shared-dog-core.webp',
    );
    expect(container.querySelectorAll('img')).toHaveLength(4);
    expect(container.querySelector('audio')).not.toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it('依 letterId 與 activityId 載入 B 的指定聽音活動', async () => {
    const user = userEvent.setup();

    renderGame(
      '/game/listen-and-choose?letterId=b&activityId=b-listen-word-picture-01',
    );

    expect(screen.getByRole('heading', { name: '聽聲音選圖片' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到 B 課程' })).toHaveAttribute(
      'href',
      '/lesson/b',
    );
    expect(
      screen.getByRole('img', { name: '一顆適合兒童辨識的彩色球' }),
    ).toHaveAttribute('src', '/assets/images/courses/b/b-ball-core.webp');

    await user.click(getImageButton('一顆適合兒童辨識的彩色球'));

    expect(
      screen.getByRole('heading', { name: '答對了！你找到有 B 聲音的圖片。' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'href',
      '/complete?activityId=b-listen-word-picture-01&letterId=b&skill=listening',
    );
  });

  it('A 題目字母音可播放正式 /æ/ 音訊', async () => {
    const user = userEvent.setup();
    renderGame('/game/listen-and-choose');

    await user.click(screen.getByRole('button', { name: '播放題目聲音' }));

    expect(screen.getByRole('heading', { name: '正在播放 A。' })).toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it('選錯與選對會顯示不同回饋，選對後可完成遊戲', async () => {
    const user = userEvent.setup();
    renderGame('/game/listen-and-choose');

    await user.click(getImageButton('一顆彩色球'));

    expect(
      screen.getByRole('heading', {
        name: '再試一次。聽聽這張圖片有沒有 A 聲音。',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    await user.click(getImageButton('一顆帶著綠葉的紅蘋果'));

    expect(
      screen.getByRole('heading', { name: '答對了！你找到有 A 聲音的圖片。' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'href',
      '/complete?activityId=a-listen-initial-sound-02&letterId=a&skill=listening&mistakes=1',
    );
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(localStorage.length).toBe(0);
  });

  it('/game/letter-image-match 使用 A 課程字母圖片配對資料', () => {
    const { container } = renderGame('/game/letter-image-match');

    expect(screen.getByRole('heading', { name: '字母與圖片配對' })).toBeInTheDocument();
    expect(
      screen.getByText('看見 A 或 a，選出和 A 聲音連在一起的圖片。'),
    ).toBeInTheDocument();
    expect(screen.getByText('看 A 或 a，找出有 A 聲音的圖片。')).toBeInTheDocument();
    expect(screen.getAllByText('A').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('a').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('ant')).toBeInTheDocument();
    expect(screen.getByText('alligator')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '一顆帶著綠葉的紅蘋果' })).toHaveAttribute(
      'src',
      '/assets/images/courses/a/a-apple-core.webp',
    );
    expect(screen.getByRole('img', { name: '一隻正在搬食物的小螞蟻' })).toHaveAttribute(
      'src',
      '/assets/images/courses/a/a-ant-core.webp',
    );
    expect(
      screen.getByRole('img', { name: '一隻張開嘴巴的友善短吻鱷' }),
    ).toHaveAttribute('src', '/assets/images/courses/a/a-alligator-core.webp');
    expect(container.querySelectorAll('img')).toHaveLength(3);
    expect(container.querySelector('audio')).not.toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it('F 字母圖片配對使用 F 課程資料與返回路徑', () => {
    const { container } = renderGame(
      '/game/letter-image-match?letterId=f&activityId=f-letter-image-match-01',
    );

    expect(screen.getByRole('heading', { name: '字母和圖片配對' })).toBeInTheDocument();
    expect(screen.getByText('看 F 或 f，找出有 F 聲音的圖片。')).toBeInTheDocument();
    expect(screen.getByText('fish')).toBeInTheDocument();
    expect(screen.getByText('fan')).toBeInTheDocument();
    expect(screen.getByText('frog')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到 F 課程' })).toHaveAttribute(
      'href',
      '/lesson/f',
    );
    expect(container.querySelectorAll('img')).toHaveLength(3);
  });

  it('字母圖片配對可逐一完成三張圖片', async () => {
    const user = userEvent.setup();
    renderGame('/game/letter-image-match');

    await user.click(getImageButton('一顆帶著綠葉的紅蘋果'));

    expect(
      screen.getByRole('heading', { name: '配對成功：A 和 apple。' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    await user.click(getImageButton('一隻正在搬食物的小螞蟻'));
    await user.click(getImageButton('一隻張開嘴巴的友善短吻鱷'));

    expect(
      screen.getByRole('heading', { name: '全部配對完成！A 可以連到這些圖片。' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'href',
      '/complete?activityId=a-letter-image-match-01&letterId=a&skill=reading',
    );
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(localStorage.length).toBe(0);
  });

  it('/game/record-and-playback 使用 A 課程錄音活動資料', () => {
    const { container } = renderGame('/game/record-and-playback');

    expect(screen.getByRole('heading', { name: '聽、念、回放' })).toBeInTheDocument();
    expect(
      screen.getByText('先聽原音，再跟著念。錄音只是讓你聽聽自己的聲音。'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('聽 A 的聲音，再念 apple、ant 和 I see an ant.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '先聽正確發音，再跟著念。這裡不做語音辨識或發音評分，也不會上傳錄音。',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '播放正確發音' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '慢速發音' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '開始錄音' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '停止錄音' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '播放我的錄音' })).toBeDisabled();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(container.querySelector('audio')).not.toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it('錄音頁可播放 A 的正式 /æ/ 原音', async () => {
    const user = userEvent.setup();
    renderGame('/game/record-and-playback');

    await user.click(screen.getByRole('button', { name: '播放正確發音' }));

    expect(screen.getByRole('heading', { name: '正在播放 A。' })).toBeInTheDocument();
    expect(localStorage.length).toBe(0);
  });

  it('瀏覽器不支援錄音時顯示友善狀態', async () => {
    const user = userEvent.setup();
    renderGame('/game/record-and-playback');

    await user.click(screen.getByRole('button', { name: '開始錄音' }));

    expect(
      screen.getByRole('heading', {
        name: '這台裝置目前不能在瀏覽器中錄音。',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(localStorage.length).toBe(0);
  });

  it('等待麥克風權限時顯示狀態並防止重複請求', async () => {
    const user = userEvent.setup();
    const getUserMedia = vi.fn(
      () =>
        new Promise<MediaStream>(() => {
          // 保持等待，驗證權限提示期間的介面狀態。
        }),
    );

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia },
    });
    Object.defineProperty(globalThis, 'MediaRecorder', {
      configurable: true,
      value: class {},
    });

    renderGame('/game/record-and-playback');
    await user.click(screen.getByRole('button', { name: '開始錄音' }));

    expect(
      screen.getByRole('heading', { name: '正在開啟麥克風。' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '正在開啟麥克風' })).toBeDisabled();
    expect(getUserMedia).toHaveBeenCalledTimes(1);
  });

  it('錄音完成後可播放自己的錄音並完成遊戲', async () => {
    const user = userEvent.setup();
    const audioUrl = 'blob:phonics-recording';

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    });
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(audioUrl);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: () => [{ stop: vi.fn() }],
        }),
      },
    });

    class MockMediaRecorder {
      mimeType = 'audio/webm';
      ondataavailable: ((event: BlobEvent) => void) | null = null;
      onerror: (() => void) | null = null;
      onstop: (() => void) | null = null;
      state: RecordingState = 'inactive';

      start() {
        this.state = 'recording';
      }

      stop() {
        this.state = 'inactive';
        this.ondataavailable?.({
          data: new Blob(['student voice'], { type: 'audio/webm' }),
        } as BlobEvent);
        this.onstop?.();
      }
    }

    Object.defineProperty(globalThis, 'MediaRecorder', {
      configurable: true,
      value: MockMediaRecorder,
    });

    renderGame('/game/record-and-playback');

    await user.click(screen.getByRole('button', { name: '開始錄音' }));

    expect(screen.getByText('recording')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '停止錄音' }));

    expect(screen.getByText('recorded')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '播放我的錄音' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '重新錄音' })).toBeEnabled();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'href',
      '/complete?activityId=a-record-and-playback-01&letterId=a&skill=speaking',
    );
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(localStorage.length).toBe(0);
  });

  it('/game/sound-sort 使用 A 課程聲音分類資料', () => {
    const { container } = renderGame('/game/sound-sort');

    expect(screen.getByRole('heading', { name: '聲音分類' })).toBeInTheDocument();
    expect(
      screen.getByText('把 A 開頭的圖片放到 A 的聲音朋友裡。'),
    ).toBeInTheDocument();
    expect(screen.getByText('看看圖片，幫它找到聲音朋友。')).toBeInTheDocument();
    expect(screen.getAllByText('A 的短短聲音').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('其他聲音').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('已分類 0 / 6')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '一顆帶著綠葉的紅蘋果' })).toHaveAttribute(
      'src',
      '/assets/images/courses/a/a-apple-core.webp',
    );
    expect(screen.getByRole('img', { name: '一顆彩色球' })).toHaveAttribute(
      'src',
      '/assets/images/shared/shared-ball-core.webp',
    );
    expect(container.querySelectorAll('img')).toHaveLength(6);
    expect(container.querySelector('audio')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(localStorage.length).toBe(0);
  });

  it('聲音分類答錯可重選，全部正確後可完成遊戲', async () => {
    const user = userEvent.setup();
    renderGame('/game/sound-sort');

    await user.click(
      within(getImageCard('一顆帶著綠葉的紅蘋果')).getByRole('button', {
        name: '其他聲音',
      }),
    );

    expect(
      screen.getByRole('heading', {
        name: '再試一次。先想想這張圖片有沒有 A 聲音。',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    const correctSorts: Array<[string, string]> = [
      ['一顆帶著綠葉的紅蘋果', 'A 的短短聲音'],
      ['一隻正在搬食物的小螞蟻', 'A 的短短聲音'],
      ['一隻張開嘴巴的友善短吻鱷', 'A 的短短聲音'],
      ['一顆彩色球', '其他聲音'],
      ['一隻友善的小貓', '其他聲音'],
      ['一隻友善的小狗', '其他聲音'],
    ];

    for (const [alt, groupName] of correctSorts) {
      await user.click(
        within(getImageCard(alt)).getByRole('button', { name: groupName }),
      );
    }

    expect(
      screen.getByRole('heading', {
        name: '全部分類完成！你找到 A 的聲音朋友了。',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('已分類 6 / 6')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'href',
      '/complete?activityId=a-sound-sort-01&letterId=a&skill=listening&mistakes=1',
    );
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(localStorage.length).toBe(0);
  });

  it('看字選答案可先答錯再答對，並以閱讀能力完成', async () => {
    const user = userEvent.setup();

    renderGame('/game/read-and-choose?letterId=a&activityId=a-read-word-picture-01');

    expect(screen.getByRole('heading', { name: '看字選圖' })).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到 A 課程' })).toHaveAttribute(
      'href',
      '/lesson/a',
    );

    await user.click(screen.getByRole('button', { name: '一隻小螞蟻' }));

    expect(
      screen.getByRole('heading', {
        name: '再讀一次，想想這個單字是哪一個意思。',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    await user.click(screen.getByRole('button', { name: '一顆紅蘋果' }));

    expect(
      screen.getByRole('heading', {
        name: '答對了！apple 就是「一顆紅蘋果」。',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '完成遊戲' })).toHaveAttribute(
      'href',
      '/complete?activityId=a-read-word-picture-01&letterId=a&skill=reading&mistakes=1',
    );
  });

  it('F 看字選答案只載入 F 課程內容', () => {
    renderGame('/game/read-and-choose?letterId=f&activityId=f-read-word-picture-01');

    expect(screen.getByRole('heading', { name: '看字讀一讀' })).toBeInTheDocument();
    expect(screen.getByText('fish')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '一條魚' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '一台風扇' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '一隻青蛙' })).toBeInTheDocument();
    expect(screen.queryByText('apple')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到 F 課程' })).toHaveAttribute(
      'href',
      '/lesson/f',
    );
  });

  it('尚未支援的 gameId 顯示單一遊戲提示', () => {
    renderGame('/game/word-builder');

    expect(screen.getByRole('heading', { name: '遊戲尚未開放' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '前往聽音選圖' })).toHaveAttribute(
      'href',
      '/game/listen-and-choose',
    );
    expect(screen.getByRole('link', { name: '前往字母配對' })).toHaveAttribute(
      'href',
      '/game/letter-image-match',
    );
    expect(screen.getByRole('link', { name: '前往錄音回放' })).toHaveAttribute(
      'href',
      '/game/record-and-playback',
    );
    expect(screen.getByRole('link', { name: '前往聲音分類' })).toHaveAttribute(
      'href',
      '/game/sound-sort',
    );
    expect(screen.getByRole('link', { name: '前往看字選答案' })).toHaveAttribute(
      'href',
      '/game/read-and-choose',
    );
  });
});

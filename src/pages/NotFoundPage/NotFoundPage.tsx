import { Link } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div>
      <PageHeader title="找不到這個頁面" description="這個路徑目前沒有對應的頁面。">
        <Link className={styles.secondaryAction} to="/">
          返回首頁
        </Link>
        <Link className={styles.primaryAction} to="/map">
          查看學習地圖
        </Link>
      </PageHeader>
    </div>
  );
}

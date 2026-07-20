import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { AppHeader } from '../AppHeader/AppHeader';
import { Navigation } from '../Navigation/Navigation';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const isFocusedLesson = location.pathname.startsWith('/lesson/');

  return (
    <div className={styles.shell}>
      {isFocusedLesson ? null : (
        <>
          <AppHeader />
          <Navigation />
        </>
      )}
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>每天一點點，聲音記得更牢。</footer>
    </div>
  );
}

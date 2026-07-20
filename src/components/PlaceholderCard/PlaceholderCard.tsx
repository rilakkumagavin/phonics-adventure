import type { ReactNode } from 'react';

import styles from './PlaceholderCard.module.css';

interface PlaceholderCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: 'default' | 'success' | 'locked';
}

export function PlaceholderCard({
  title,
  description,
  children,
  tone = 'default',
}: PlaceholderCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {children}
    </article>
  );
}

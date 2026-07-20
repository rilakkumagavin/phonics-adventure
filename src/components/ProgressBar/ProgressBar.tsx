import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  label: string;
  value: number;
}

export function ProgressBar({ label, value }: ProgressBarProps) {
  const boundedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={styles.group}>
      <div className={styles.labelRow}>
        <span>{label}</span>
        <span>{boundedValue}%</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuenow={boundedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className={styles.fill} style={{ width: `${boundedValue}%` }} />
      </div>
    </div>
  );
}

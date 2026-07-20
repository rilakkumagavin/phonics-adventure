import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const navItems = [
  { to: '/', label: '開始' },
  { to: '/map', label: '選字母' },
  { to: '/grade/2', label: '二年級' },
  { to: '/grade/3', label: '三年級' },
  { to: '/progress', label: '進度' },
];

export function Navigation() {
  return (
    <nav className={styles.nav} aria-label="主要導覽">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          aria-label={`前往${item.label}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

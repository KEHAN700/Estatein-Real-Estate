import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CloseIcon from '@/assets/icons/close.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import { Logo } from '@/components/ui/Logo';
import { useLockBody } from '@/hooks/useLockBody';
import s from './Header.module.scss';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useLockBody(open);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) => clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <div className={clsx('container', s.inner)}>
        <Logo className={s.logo} />

        <nav className={clsx(s.nav, open && s.open)} id="main-nav" aria-label="Main">
          <ul className={s.list}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className={s.mobileOnly}>
              <NavLink to="/contact" className={linkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>

        <NavLink to="/contact" className={({ isActive }) => clsx(s.contact, isActive && s.contactActive)}>
          Contact Us
        </NavLink>

        <button
          type="button"
          className={s.burger}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <CloseIcon aria-hidden /> : <MenuIcon aria-hidden />}
        </button>
      </div>
    </header>
  );
}

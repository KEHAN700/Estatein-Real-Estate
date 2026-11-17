import { Link } from 'react-router-dom';
import LogoSvg from '@/assets/icons/logo.svg?react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={className} aria-label="Estatein home">
      <LogoSvg aria-hidden />
    </Link>
  );
}

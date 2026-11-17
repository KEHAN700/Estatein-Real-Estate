import clsx from 'clsx';
import s from './Status.module.scss';

interface Props {
  state: 'loading' | 'error' | 'empty';
  message?: string;
  className?: string;
}

const defaults = {
  loading: 'Loading…',
  error: "We couldn't load this right now. Please refresh the page.",
  empty: 'Nothing to show yet.',
};

export function Status({ state, message, className }: Props) {
  return (
    <div className={clsx(s.status, s[state], className)} role={state === 'error' ? 'alert' : 'status'}>
      {state === 'loading' && <span className={s.spinner} aria-hidden />}
      <p>{message ?? defaults[state]}</p>
    </div>
  );
}

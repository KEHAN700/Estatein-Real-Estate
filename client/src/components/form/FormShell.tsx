import clsx from 'clsx';
import type { FormHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Checkbox } from './fields';
import s from './FormShell.module.scss';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  agreeProps: Record<string, unknown>;
  agreeError?: string;
  submitting: boolean;
  feedback?: { type: 'success' | 'error'; text: string } | null;
  compact?: boolean;
}

// Shared frame for the site forms: bordered card, terms checkbox and submit row
export function FormShell({
  children,
  agreeProps,
  agreeError,
  submitting,
  feedback,
  compact,
  className,
  ...rest
}: Props) {
  return (
    <form className={clsx(s.form, compact && s.compact, className)} noValidate {...rest}>
      <div className={s.fields}>{children}</div>
      <div className={s.footer}>
        <Checkbox {...agreeProps} error={agreeError}>
          I agree with <Link to="/terms">Terms of Use</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </Checkbox>
        <Button type="submit" variant="primary" className={s.submit} disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Your Message'}
        </Button>
      </div>
      {feedback && (
        <p
          className={clsx(s.feedback, s[feedback.type])}
          role={feedback.type === 'error' ? 'alert' : 'status'}
        >
          {feedback.text}
        </p>
      )}
    </form>
  );
}

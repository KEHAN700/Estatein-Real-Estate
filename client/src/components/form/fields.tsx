import clsx from 'clsx';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import ChevronDown from '@/assets/icons/chevron-down.svg?react';
import type { Option } from '@/api/types';
import s from './fields.module.scss';

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  children: (id: string, describedBy?: string) => ReactNode;
}

export function Field({ label, error, className, children }: FieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={clsx(s.field, className)}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      {children(id, errorId)}
      {error && (
        <p id={errorId} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<'input'> & { invalid?: boolean; icon?: ReactNode };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, icon, className, ...props },
  ref,
) {
  return (
    <div className={clsx(s.control, invalid && s.invalid, className)}>
      {icon}
      <input ref={ref} aria-invalid={invalid || undefined} {...props} />
    </div>
  );
});

type SelectProps = ComponentPropsWithoutRef<'select'> & {
  invalid?: boolean;
  options: Option[];
  placeholder: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, options, placeholder, className, ...props },
  ref,
) {
  return (
    <div className={clsx(s.control, s.select, invalid && s.invalid, className)}>
      <select ref={ref} aria-invalid={invalid || undefined} defaultValue="" {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className={s.chevron} aria-hidden />
    </div>
  );
});

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, ...props },
  ref,
) {
  return (
    <div className={clsx(s.control, s.textarea, invalid && s.invalid, className)}>
      <textarea ref={ref} rows={5} aria-invalid={invalid || undefined} {...props} />
    </div>
  );
});

type CheckboxProps = ComponentPropsWithoutRef<'input'> & { error?: string; children: ReactNode };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { error, children, className, ...props },
  ref,
) {
  return (
    <div className={className}>
      <label className={s.checkbox}>
        <input ref={ref} type="checkbox" aria-invalid={Boolean(error) || undefined} {...props} />
        <span className={s.box} aria-hidden />
        <span>{children}</span>
      </label>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
});

type RadioCardProps = ComponentPropsWithoutRef<'input'> & { icon: ReactNode; children: ReactNode };

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(function RadioCard(
  { icon, children, className, ...props },
  ref,
) {
  return (
    <label className={clsx(s.control, s.radio, className)}>
      {icon}
      <span className={s.radioText}>{children}</span>
      <input ref={ref} type="radio" {...props} />
      <span className={s.dot} aria-hidden />
    </label>
  );
});

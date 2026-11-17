import s from './StatCard.module.scss';

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className={s.card}>
      <dt className={s.label}>{label}</dt>
      <dd className={s.value}>{value}</dd>
    </div>
  );
}

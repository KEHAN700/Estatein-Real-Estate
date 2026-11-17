import { useEffect, useState, type ComponentType, type FormEvent, type SVGProps } from 'react';
import BanknoteIcon from '@/assets/icons/banknote.svg?react';
import CalendarIcon from '@/assets/icons/calendar.svg?react';
import ChevronDown from '@/assets/icons/chevron-down.svg?react';
import CubeIcon from '@/assets/icons/cube.svg?react';
import HouseIcon from '@/assets/icons/house.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import { usePropertyFilters } from '@/api/queries';
import type { Option, PropertyFilters } from '@/api/types';
import { Button } from '@/components/ui/Button';
import s from './SearchPanel.module.scss';

export type FilterKey = 'location' | 'type' | 'price' | 'size' | 'year';
export type FilterValues = Partial<Record<FilterKey | 'q', string>>;

const filterConfig: {
  key: FilterKey;
  source: keyof PropertyFilters;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { key: 'location', source: 'locations', label: 'Location', Icon: PinIcon },
  { key: 'type', source: 'types', label: 'Property Type', Icon: HouseIcon },
  { key: 'price', source: 'prices', label: 'Pricing Range', Icon: BanknoteIcon },
  { key: 'size', source: 'sizes', label: 'Property Size', Icon: CubeIcon },
  { key: 'year', source: 'years', label: 'Build Year', Icon: CalendarIcon },
];

interface Props {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

export function SearchPanel({ values, onChange }: Props) {
  const { data: filters } = usePropertyFilters();
  const [query, setQuery] = useState(values.q ?? '');

  useEffect(() => {
    setQuery(values.q ?? '');
  }, [values.q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onChange({ ...values, q: query.trim() || undefined });
  };

  const hasFilters = Object.values(values).some(Boolean);

  return (
    <div className={`container ${s.panel}`} id="search">
      <form className={s.search} onSubmit={submit} role="search">
        <label htmlFor="property-search" className="visually-hidden">
          Search for a property
        </label>
        <input
          id="property-search"
          type="search"
          placeholder="Search For A Property"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          icon={<SearchIcon aria-hidden />}
          className={s.submit}
        >
          <span className={s.submitLabel}>Find Property</span>
        </Button>
      </form>

      <div className={s.filters}>
        {filterConfig.map(({ key, source, label, Icon }) => (
          <FilterSelect
            key={key}
            label={label}
            Icon={Icon}
            value={values[key] ?? ''}
            options={filters?.[source] ?? []}
            onChange={(value) => onChange({ ...values, [key]: value || undefined })}
          />
        ))}
      </div>

      {hasFilters && (
        <button type="button" className={s.reset} onClick={() => onChange({})}>
          Clear all filters
        </button>
      )}
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, Icon, value, options, onChange }: FilterSelectProps) {
  return (
    <label className={s.filter} data-active={Boolean(value)}>
      <Icon className={s.filterIcon} aria-hidden />
      <span className="visually-hidden">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className={s.chevron} aria-hidden>
        <ChevronDown />
      </span>
    </label>
  );
}

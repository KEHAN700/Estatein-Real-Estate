interface Range {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const priceRanges: Range[] = [
  { id: 'under-500k', label: 'Under $500K', min: 0, max: 500_000 },
  { id: '500k-1m', label: '$500K - $1M', min: 500_000, max: 1_000_000 },
  { id: '1m-2m', label: '$1M - $2M', min: 1_000_000, max: 2_000_000 },
  { id: 'over-2m', label: 'Over $2M', min: 2_000_000, max: Infinity },
];

export const sizeRanges: Range[] = [
  { id: 'under-1500', label: 'Under 1,500 sq ft', min: 0, max: 1500 },
  { id: '1500-2500', label: '1,500 - 2,500 sq ft', min: 1500, max: 2500 },
  { id: 'over-2500', label: 'Over 2,500 sq ft', min: 2500, max: Infinity },
];

export const yearRanges: Range[] = [
  { id: 'before-2010', label: 'Before 2010', min: 0, max: 2010 },
  { id: '2010-2017', label: '2010 - 2017', min: 2010, max: 2018 },
  { id: 'since-2018', label: '2018 and newer', min: 2018, max: Infinity },
];

export const inRange = (ranges: Range[], id: string | undefined, value: number) => {
  if (!id) return true;
  const range = ranges.find((r) => r.id === id);
  if (!range) return true;
  return value >= range.min && value < range.max;
};

export const toOptions = (ranges: Range[]) => ranges.map(({ id, label }) => ({ value: id, label }));

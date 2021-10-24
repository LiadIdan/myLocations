export interface SortOptions<T> {
  key?: StringKeys<T>;
  direction?: SortDirection;
}

export type SortDirection = 'asc' | 'desc';

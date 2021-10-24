import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, key, State } from './reducer';
import { SortOptions } from '@app/store';
import { Location } from '@app/shared/models';

const featureSelector = createFeatureSelector<State>(key);

export const selectAll = createSelector(featureSelector, adapter.getSelectors().selectAll);

export const selectEntities = createSelector(
  featureSelector,
  adapter.getSelectors().selectEntities
);

export const selectOne = (id: string) => createSelector(selectEntities, (entities) => entities[id]);

export const selectLoadingStatus = createSelector(featureSelector, (state) => state.loading);

export const selectSortOptions = createSelector(featureSelector, (state) => state.sort);

export const selectGroupByCategory = createSelector(
  featureSelector,
  (state) => state.groupByCategory
);

export const selectSelectedCategoryIds = createSelector(
  featureSelector,
  (state) => state.selectedCategoryIds
);

export const selectTableItems = createSelector(
  selectAll,
  selectSortOptions,
  selectSelectedCategoryIds,
  (locations, sortOptions, ids) => sortBy(filterByCategories(locations, ids), sortOptions)
);

function filterByCategories(locations: Location[], categoryIds: string[]): Location[] {
  if (!categoryIds.length) {
    return locations;
  }
  return locations.filter((l) => l.categoryIds.some((id) => categoryIds.includes(id)));
}

function sortBy(items: Location[], sortOptions: SortOptions<Location>): Location[] {
  const { key, direction } = sortOptions;

  if (key) {
    return [...items].sort((a, b) =>
      direction === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
    );
  }
  return items;
}

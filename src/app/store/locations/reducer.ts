import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LocationActions from './actions';
import { Location } from '@app/shared/models';
import { SortOptions } from '@app/store';

export const key = 'locations';

export interface State extends EntityState<Location> {
  loading: boolean;
  sort: SortOptions<Location>;
  selectedCategoryIds: string[];
  groupByCategory: boolean;
}

export const adapter: EntityAdapter<Location> = createEntityAdapter<Location>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  sort: {},
  selectedCategoryIds: [],
  groupByCategory: false,
});

export const locationsReducer = createReducer(
  initialState,
  on(LocationActions.loadLocations, (state) => ({ ...state, loading: true })),
  on(LocationActions.loadLocationsSuccess, (state, { locations }) =>
    adapter.setAll(locations, { ...state, loading: false })
  ),
  on(LocationActions.loadLocationSuccess, (state, { location }) => adapter.addOne(location, state)),
  on(LocationActions.addLocationSuccess, (state, { location }) => adapter.addOne(location, state)),
  on(LocationActions.updateLocationSuccess, (state, { location }) =>
    adapter.setOne(location, state)
  ),
  on(LocationActions.deleteLocationSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(LocationActions.removeDeletedCategoryIdSuccess, (state, { locations }) =>
    adapter.upsertMany(locations, state)
  ),
  on(LocationActions.sortBy, (state, { property }) => ({
    ...state,
    sort: updateSortOptions(property, state),
  })),
  on(LocationActions.updateSelectedCategoryIds, (state, { ids }) => ({
    ...state,
    selectedCategoryIds: ids,
  })),
  on(LocationActions.setGroupByCategory, (state, { groupByCategory }) => ({
    ...state,
    groupByCategory,
  }))
);

function updateSortOptions(property: StringKeys<Location>, state: State): SortOptions<Location> {
  const { key, direction } = state.sort;

  if (key === property) {
    return direction === 'asc' ? { key: property, direction: 'desc' } : {};
  }
  return { key: property, direction: 'asc' };
}

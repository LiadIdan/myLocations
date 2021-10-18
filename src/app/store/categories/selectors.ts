import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, key, State } from './reducer';

const featureSelector = createFeatureSelector<State>(key);

export const selectAll = createSelector(featureSelector, adapter.getSelectors().selectAll);

export const selectEntities = createSelector(
  featureSelector,
  adapter.getSelectors().selectEntities
);

export const selectOne = (id: string) => createSelector(selectEntities, (entities) => entities[id]);

export const selectLoadingStatus = createSelector(featureSelector, (state) => state.loading);

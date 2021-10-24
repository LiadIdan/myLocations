import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, key, State } from './reducer';
import { Observable } from 'rxjs';
import { Category } from '@app/shared/models';

const featureSelector = createFeatureSelector<State>(key);

export const selectAll = createSelector(featureSelector, adapter.getSelectors().selectAll);

export const selectEntities = createSelector(
  featureSelector,
  adapter.getSelectors().selectEntities
);

export const selectOne = (id: string) => createSelector(selectEntities, (entities) => entities[id]);

export const selectMany = (ids: string[]) =>
  createSelector(
    selectEntities,
    (entities) => Object.values(entities).filter((e) => e && ids.includes(e.id)) as Category[]
  );

export const selectLoadingStatus = createSelector(featureSelector, (state) => state.loading);

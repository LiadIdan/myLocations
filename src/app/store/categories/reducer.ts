import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CategoryActions from './actions';
import { Category } from '@app/shared/models';

export const key = 'categories';

export interface State extends EntityState<Category> {
  loading: boolean;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = adapter.getInitialState({
  loading: false,
});

export const categoriesReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) =>
    adapter.setAll(categories, { ...state, loading: false })
  ),
  on(CategoryActions.loadCategorySuccess, (state, { category }) => adapter.addOne(category, state)),
  on(CategoryActions.addCategorySuccess, (state, { category }) => adapter.addOne(category, state)),
  on(CategoryActions.updateCategorySuccess, (state, { category }) =>
    adapter.setOne(category, state)
  ),
  on(CategoryActions.deleteCategorySuccess, (state, { id }) => adapter.removeOne(id, state))
);

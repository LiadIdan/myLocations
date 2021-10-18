import { createAction, props } from '@ngrx/store';
import { UpdateStr } from '@ngrx/entity/src/models';

import { Category, CreateCategoryDto } from '@app/shared/models';

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategory = createAction('[Category] Load Category', props<{ id: string }>());
export const loadCategorySuccess = createAction(
  '[Category] Load Category Success',
  props<{ category: Category }>()
);
export const loadCategoryFailure = createAction(
  '[Category] Load Category Failure',
  props<{ error: Error }>()
);

export const addCategory = createAction(
  '[Category] Add Category',
  props<{ category: CreateCategoryDto }>()
);
export const addCategorySuccess = createAction(
  '[Category] Add Category Success',
  props<{ category: Category }>()
);

export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ category: UpdateStr<Category> }>()
);
export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ category: Category }>()
);
export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: Error }>()
);

export const deleteCategory = createAction('[Category] Delete Category', props<{ id: string }>());
export const deleteCategorySuccess = createAction(
  '[Category] Delete Category Success',
  props<{ id: string }>()
);
export const deleteCategoryFailure = createAction(
  '[Category] Delete Category Failure',
  props<{ error: Error }>()
);

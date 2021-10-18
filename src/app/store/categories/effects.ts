import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as categoryActions from './actions';
import { CategoriesService } from '@app/core/services';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.loadCategories),
      switchMap(() => this._categoriesService.getCategories()),
      map((categories) => categoryActions.loadCategoriesSuccess({ categories }))
    )
  );

  loadCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.loadCategory),
      switchMap(({ id }) => this._categoriesService.getCategory(id)),
      map((category) => categoryActions.loadCategorySuccess({ category })),
      catchError((error) => of(categoryActions.loadCategoryFailure({ error })))
    )
  );

  addCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.addCategory),
      switchMap(({ category }) => this._categoriesService.createCategory(category)),
      map((category) => categoryActions.addCategorySuccess({ category }))
    )
  );

  updateCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.updateCategory),
      switchMap(({ category }) => this._categoriesService.updateCategory(category)),
      map((category) => categoryActions.updateCategorySuccess({ category })),
      catchError((error) => of(categoryActions.updateCategoryFailure({ error })))
    )
  );

  deleteCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.deleteCategory),
      switchMap(({ id }) => this._categoriesService.deleteCategory(id)),
      map((id) => categoryActions.deleteCategorySuccess({ id })),
      catchError((error) => of(categoryActions.deleteCategoryFailure({ error })))
    )
  );

  constructor(private _actions$: Actions, private _categoriesService: CategoriesService) {}
}

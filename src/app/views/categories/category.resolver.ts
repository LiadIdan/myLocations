import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, switchMap, take, tap } from 'rxjs';

import { CoreState, fromCategories } from '@app/store';
import { Category } from '@app/shared/models';
import { Actions } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import { CategoriesService } from '@app/core/services';

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<Category> {
  constructor(
    private _actions$: Actions,
    private _categoriesService: CategoriesService,
    private _router: Router,
    private _store: Store<CoreState>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Category> {
    const id = route.paramMap.get('id') as string;
    return this._getCategory(id);
  }

  private _getCategoryFromStore(id: string): Observable<Category | undefined> {
    return this._store.select(fromCategories.selectOne(id)).pipe(take(1));
  }

  private _getCategoryFromApi(id: string): Observable<Category> {
    return this._categoriesService.getCategory(id).pipe(
      tap((category) => this._store.dispatch(fromCategories.loadCategorySuccess({ category }))),
      catchError(() => {
        this._router.navigate(['/404']);
        return EMPTY;
      })
    );
  }

  private _getCategory(id: string): Observable<Category> {
    return this._getCategoryFromStore(id).pipe(
      switchMap((category) => {
        if (category) {
          return of(category);
        }
        return this._getCategoryFromApi(id);
      })
    );
  }
}

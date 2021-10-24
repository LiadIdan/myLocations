import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, switchMap, take, tap } from 'rxjs';

import { CoreState, fromLocations } from '@app/store';
import { Location } from '@app/shared/models';
import { Actions } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import { LocationsService } from '@app/core/services';

@Injectable({ providedIn: 'root' })
export class LocationResolver implements Resolve<Location> {
  constructor(
    private _actions$: Actions,
    private _categoriesService: LocationsService,
    private _router: Router,
    private _store: Store<CoreState>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Location> {
    const id = route.paramMap.get('id') as string;
    return this._getLocation(id);
  }

  private _getLocationFromStore(id: string): Observable<Location | undefined> {
    return this._store.select(fromLocations.selectOne(id)).pipe(take(1));
  }

  private _getLocationFromApi(id: string): Observable<Location> {
    return this._categoriesService.getLocation(id).pipe(
      tap((location) => this._store.dispatch(fromLocations.loadLocationSuccess({ location }))),
      catchError(() => {
        this._router.navigate(['/404']);
        return EMPTY;
      })
    );
  }

  private _getLocation(id: string): Observable<Location> {
    return this._getLocationFromStore(id).pipe(
      switchMap((location) => {
        if (location) {
          return of(location);
        }
        return this._getLocationFromApi(id);
      })
    );
  }
}

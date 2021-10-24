import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as locationActions from './actions';
import { LocationsService } from '@app/core/services';
import { CoreState } from '@app/store';

@Injectable()
export class LocationEffects {
  loadLocations$ = createEffect(() =>
    this._actions$.pipe(
      ofType(locationActions.loadLocations),
      switchMap(() => this._locationsService.getLocations()),
      map((locations) => locationActions.loadLocationsSuccess({ locations }))
    )
  );

  loadLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(locationActions.loadLocation),
      switchMap(({ id }) => this._locationsService.getLocation(id)),
      map((location) => locationActions.loadLocationSuccess({ location })),
      catchError((error) => of(locationActions.loadLocationFailure({ error })))
    )
  );

  addLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(locationActions.addLocation),
      switchMap(({ location }) => this._locationsService.createLocation(location)),
      map((location) => locationActions.addLocationSuccess({ location }))
    )
  );

  updateLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(locationActions.updateLocation),
      switchMap(({ location }) => this._locationsService.updateLocation(location)),
      map((location) => locationActions.updateLocationSuccess({ location })),
      catchError((error) => of(locationActions.updateLocationFailure({ error })))
    )
  );

  deleteLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(locationActions.deleteLocation),
      switchMap(({ id }) => this._locationsService.deleteLocation(id)),
      map((id) => locationActions.deleteLocationSuccess({ id })),
      catchError((error) => of(locationActions.deleteLocationFailure({ error })))
    )
  );

  removeDeletedCategoryId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(locationActions.removeDeletedCategoryId),
      switchMap(({ categoryId }) => this._locationsService.removeDeletedCategoryId(categoryId)),
      map((locations) => locationActions.removeDeletedCategoryIdSuccess({ locations }))
    )
  );

  constructor(
    private _actions$: Actions,
    private _locationsService: LocationsService,
    private _store: Store<CoreState>
  ) {}
}

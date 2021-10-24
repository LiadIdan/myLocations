import { Injectable } from '@angular/core';
import { UpdateStr } from '@ngrx/entity/src/models';
import { Observable, of, throwError, withLatestFrom } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Location, CreateLocationDto } from '@app/shared/models';
import { LocalStorageService, StorageKey } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  constructor(private _localStorageService: LocalStorageService) {}

  getLocations(): Observable<Location[]> {
    return of(this._localStorageService.getItem(StorageKey.LOCATIONS) ?? []);
  }

  getLocation(id: string): Observable<Location> {
    return this.getLocations().pipe(
      map((locations) => locations.find((l) => l.id === id)),
      switchMap((location) => (location ? of(location) : throwError(() => new Error('Not Found'))))
    );
  }

  createLocation(location: CreateLocationDto): Observable<Location> {
    const newLocation: Location = { id: uuid(), ...location };

    return this.getLocations().pipe(
      map((locations) => [...locations, newLocation]),
      tap((locations) => this._updateStorage(locations)),
      mapTo(newLocation)
    );
  }

  updateLocation(location: UpdateStr<Location>): Observable<Location> {
    return this.getLocations().pipe(
      map((locations) => locations.map((l) => (l.id === location.id ? { ...l, ...location } : l))),
      tap((locations) => this._updateStorage(locations)),
      switchMap(() => this.getLocation(location.id))
    );
  }

  deleteLocation(id: string): Observable<string> {
    return this.getLocations().pipe(
      withLatestFrom(this.getLocation(id)),
      map(([locations]) => locations.filter((l) => l.id !== id)),
      tap((locations) => this._updateStorage(locations)),
      mapTo(id)
    );
  }

  removeDeletedCategoryId(categoryId: string): Observable<Location[]> {
    return this.getLocations().pipe(
      map((locations) =>
        locations.map((l) => ({
          ...l,
          categoryIds: l.categoryIds.filter((id) => id !== categoryId),
        }))
      ),
      tap((locations) => this._updateStorage(locations))
    );
  }

  private _updateStorage(locations: Location[]): void {
    this._localStorageService.setItem(StorageKey.LOCATIONS, locations);
  }
}

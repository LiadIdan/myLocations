import { Injectable } from '@angular/core';
import { UpdateStr } from '@ngrx/entity/src/models';
import { Observable, of, throwError, withLatestFrom } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Category, CreateCategoryDto } from '@app/shared/models';
import { LocalStorageService, StorageKey } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private _localStorageService: LocalStorageService) {}

  getCategories(): Observable<Category[]> {
    return of(this._localStorageService.getItem(StorageKey.CATEGORIES) ?? []);
  }

  getCategory(id: string): Observable<Category> {
    return this.getCategories().pipe(
      map((categories) => categories.find((c) => c.id === id)),
      switchMap((category) => (category ? of(category) : throwError(() => new Error('Not Found'))))
    );
  }

  createCategory(category: CreateCategoryDto): Observable<Category> {
    const newCategory: Category = { id: uuid(), ...category };

    return this.getCategories().pipe(
      map((categories) => [...categories, newCategory]),
      tap((categories) => this._updateStorage(categories)),
      mapTo(newCategory)
    );
  }

  updateCategory(category: UpdateStr<Category>): Observable<Category> {
    return this.getCategories().pipe(
      map((categories) =>
        categories.map((c) => (c.id === category.id ? { ...c, ...category } : c))
      ),
      tap((categories) => this._updateStorage(categories)),
      switchMap(() => this.getCategory(category.id))
    );
  }

  deleteCategory(id: string): Observable<string> {
    return this.getCategories().pipe(
      withLatestFrom(this.getCategory(id)),
      map(([categories]) => categories.filter((c) => c.id !== id)),
      tap((categories) => this._updateStorage(categories)),
      mapTo(id)
    );
  }

  private _updateStorage(categories: Category[]): void {
    this._localStorageService.setItem(StorageKey.CATEGORIES, categories);
  }
}

import { Inject, Injectable } from '@angular/core';

import { WINDOW } from '@app/core/tokens';
import { Category, Location } from '@app/shared/models';

export enum StorageKey {
  CATEGORIES = 'CATEGORIES',
  LOCATIONS = 'LOCATIONS',
}

interface StorageKeyType {
  [StorageKey.CATEGORIES]: Category[];
  [StorageKey.LOCATIONS]: Location[];
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor(@Inject(WINDOW) private _window: Window) {}

  getItem<T extends StorageKey>(key: T): StorageKeyType[T] | null {
    const item = this._window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T extends StorageKey>(key: T, value: StorageKeyType[T]): void {
    this._window.localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: StorageKey): void {
    this._window.localStorage.removeItem(key);
  }

  clear(): void {
    this._window.localStorage.clear();
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';

import { CoreState, fromCategories } from '@app/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'categoryIdToName',
})
export class CategoryIdToNamePipe implements PipeTransform {
  constructor(private _store: Store<CoreState>) {}

  transform(id: string): Observable<string> {
    return this._store
      .select(fromCategories.selectOne(id))
      .pipe(map((category) => category?.name ?? '-'));
  }
}

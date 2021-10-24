import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, Subject, switchMap, take, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

import { Location } from '@app/shared/models';
import { CoreState, fromCategories, fromLocations } from '@app/store';
import { LayoutService } from '@app/core/services';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit, OnDestroy {
  selectedItem?: { id: string; index: number };
  groupByCategoryControl = new FormControl();
  selectedCategoriesControl = new FormControl();

  locations$ = this._store.select(fromLocations.selectTableItems);
  loading$ = this._store.select(fromLocations.selectLoadingStatus);
  groupByCategory$ = this._store.select(fromLocations.selectGroupByCategory);

  items$ = this.groupByCategory$.pipe(
    switchMap((group) => (group ? this.groupedLocations$ : this.locations$))
  );

  sortDirection$ = this._store
    .select(fromLocations.selectSortOptions)
    .pipe(map((o) => o.direction));

  categoryOptions$ = this._store.select(fromLocations.selectAll).pipe(
    map((locations) => locations.map((l) => l.categoryIds).flat()),
    map((categoryIds) => Array.from(new Set(categoryIds))), // Removes duplicates
    switchMap((categoryIds) => this._store.select(fromCategories.selectMany(categoryIds)))
  );

  groupedLocations$ = combineLatest([
    this.locations$,
    this.categoryOptions$,
    this._store.select(fromLocations.selectSelectedCategoryIds),
  ]).pipe(
    map(([locations, categories, categoryIds]) => {
      const ids = categoryIds.length ? (categoryIds as string[]) : categories.map((c) => c.id);

      return ids
        .map((id) =>
          locations
            .filter((l) => l.categoryIds.includes(id))
            .map((l) => ({ ...l, categoryIds: [id] }))
        )
        .flat();
    })
  );

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _actions$: Actions,
    private _layoutService: LayoutService,
    private _store: Store<CoreState>
  ) {}

  ngOnInit(): void {
    this._layoutService.setToolbarPortal(this.portal);

    this._store.dispatch(fromCategories.loadCategories());
    this._store.dispatch(fromLocations.loadLocations());

    this._store
      .select(fromLocations.selectSelectedCategoryIds)
      .pipe(take(1))
      .subscribe((ids) => this.selectedCategoriesControl.setValue(ids));

    this._store
      .select(fromLocations.selectGroupByCategory)
      .pipe(take(1))
      .subscribe((group) => this.groupByCategoryControl.setValue(group));

    this._actions$
      .pipe(ofType(fromLocations.deleteLocationSuccess), takeUntil(this._destroyed$))
      .subscribe(() => this._onDeleteSuccess());

    this._actions$
      .pipe(ofType(fromLocations.deleteLocationFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onDeleteFailure(error));

    this.selectedCategoriesControl.valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe((ids) => this._onSelectCategoriesChange(ids));

    this.groupByCategoryControl.valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe((group) => this._onGroupByCategoryChange(group));
  }

  onSort(property: StringKeys<Location>): void {
    this._store.dispatch(fromLocations.sortBy({ property }));
  }

  onSelectItem(id: string, index: number): void {
    this.selectedItem = this.selectedItem?.id !== id ? { id, index } : undefined;
  }

  onDeleteLocation(): void {
    const modalRef = this._layoutService.openDeleteConfirmationModal('location');

    modalRef.closed.subscribe((confirmed) => {
      if (confirmed && this.selectedItem) {
        this._store.dispatch(fromLocations.deleteLocation({ id: this.selectedItem.id }));
      }
    });
  }

  private _onDeleteSuccess(): void {
    this.selectedItem = undefined;
  }

  private _onDeleteFailure(error: Error): void {
    alert(error.message ?? 'Error occurred');
  }

  private _onSelectCategoriesChange(ids: string[]): void {
    this.selectedItem = undefined;
    this._store.dispatch(fromLocations.updateSelectedCategoryIds({ ids }));
  }

  private _onGroupByCategoryChange(groupByCategory: boolean): void {
    this.selectedItem = undefined;
    this._store.dispatch(fromLocations.setGroupByCategory({ groupByCategory }));
  }

  ngOnDestroy(): void {
    this.portal.detach();
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

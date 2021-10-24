import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { CoreState, fromCategories } from '@app/store';
import { LayoutService } from '@app/core/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  selectedId!: string | null;
  categories$ = this._store.select(fromCategories.selectAll);
  loading$ = this._store.select(fromCategories.selectLoadingStatus);

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _actions$: Actions,
    private _layoutService: LayoutService,
    private _store: Store<CoreState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(fromCategories.loadCategories());
    this._layoutService.setToolbarPortal(this.portal);

    this._actions$
      .pipe(ofType(fromCategories.deleteCategorySuccess), takeUntil(this._destroyed$))
      .subscribe(() => this._onDeleteSuccess());

    this._actions$
      .pipe(ofType(fromCategories.deleteCategoryFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onDeleteFailure(error));
  }

  onSelectCategory(id: string): void {
    this.selectedId = this.selectedId !== id ? id : null;
  }

  onDeleteCategory(): void {
    const modalRef = this._layoutService.openDeleteConfirmationModal('category');

    modalRef.closed.subscribe((confirmed) => {
      if (confirmed) {
        this._store.dispatch(fromCategories.deleteCategory({ id: this.selectedId as string }));
      }
    });
  }

  private _onDeleteSuccess(): void {
    this.selectedId = null;
  }

  private _onDeleteFailure(error: Error): void {
    alert(error.message ?? 'Error occurred');
  }

  ngOnDestroy(): void {
    this.portal.detach();
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

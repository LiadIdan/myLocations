import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Category } from '@app/shared/models';
import { LayoutService } from '@app/core/services';
import { CoreState, fromCategories } from '@app/store';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  category!: Category;

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _actions$: Actions,
    private _layoutService: LayoutService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<CoreState>
  ) {}

  ngOnInit(): void {
    this._route.data
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ category }) => this._onCategoryResolved(category));

    this._actions$
      .pipe(ofType(fromCategories.deleteCategorySuccess), takeUntil(this._destroyed$))
      .subscribe(() => this._onDeleteSuccess());

    this._actions$
      .pipe(ofType(fromCategories.deleteCategoryFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onDeleteFailure(error));
  }

  private _onCategoryResolved(category: Category): void {
    this.category = category;
    this._layoutService.setToolbarPortal(this.portal);
  }

  onDeleteCategory(): void {
    const modalRef = this._layoutService.openDeleteConfirmationModal('category');

    modalRef.closed.subscribe((confirmed) => {
      if (confirmed) {
        this._store.dispatch(fromCategories.deleteCategory({ id: this.category.id }));
      }
    });
  }

  private _onDeleteSuccess(): void {
    this._router.navigate(['../..'], { relativeTo: this._route });
  }

  private _onDeleteFailure(error: Error): void {
    alert(error.message ?? 'Error occurred');
  }

  ngOnDestroy(): void {
    if (this.portal.isAttached) {
      this.portal.detach();
    }

    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

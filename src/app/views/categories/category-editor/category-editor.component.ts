import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LayoutService } from '@app/core/services';
import { CoreState, fromCategories } from '@app/store';
import { Category } from '@app/shared/models';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  mode: 'edit' | 'create' = 'create';

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private _destroyed$ = new Subject<void>();

  get id(): AbstractControl {
    return this.form.get('id') as AbstractControl;
  }

  constructor(
    private _actions$: Actions,
    private _fb: FormBuilder,
    private _layoutService: LayoutService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store<CoreState>
  ) {}

  ngOnInit(): void {
    this.form = this._buildForm();
    this._layoutService.setToolbarPortal(this.portal);

    this._route.data
      .pipe(
        takeUntil(this._destroyed$),
        filter(({ category }) => !!category)
      )
      .subscribe(({ category }) => this._onCategoryResolved(category));

    this._actions$
      .pipe(
        ofType(fromCategories.addCategorySuccess, fromCategories.updateCategorySuccess),
        takeUntil(this._destroyed$)
      )
      .subscribe(() => this._onSubmitSuccess());

    this._actions$
      .pipe(ofType(fromCategories.updateCategoryFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onSubmitFailure(error));

    this._actions$
      .pipe(ofType(fromCategories.deleteCategorySuccess), takeUntil(this._destroyed$))
      .subscribe(() => this._onDeleteSuccess());

    this._actions$
      .pipe(ofType(fromCategories.deleteCategoryFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onDeleteFailure(error));
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.mode === 'create'
        ? this._store.dispatch(fromCategories.addCategory({ category: this.form.value }))
        : this._store.dispatch(
            fromCategories.updateCategory({ category: this.form.getRawValue() })
          );
    }
  }

  onDeleteCategory(id: string): void {
    const modalRef = this._layoutService.openDeleteConfirmationModal('category');

    modalRef.closed.subscribe((confirmed) => {
      if (confirmed) {
        this._store.dispatch(fromCategories.deleteCategory({ id }));
      }
    });
  }

  private _onCategoryResolved(category: Category): void {
    this.mode = 'edit';
    this.form.patchValue(category);
  }

  private _onSubmitSuccess(): void {
    this._router.navigate(['..'], { relativeTo: this._route });
  }

  private _onSubmitFailure(error: Error): void {
    alert(error.message ?? 'Error Occurred');
  }

  private _onDeleteSuccess(): void {
    this._router.navigate(['..'], { relativeTo: this._route });
  }

  private _onDeleteFailure(error: Error): void {
    alert(error.message ?? 'Error occurred');
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      id: { value: null, disabled: true },
      name: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.portal.detach();
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

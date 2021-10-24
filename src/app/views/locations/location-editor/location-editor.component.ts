import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GoogleMapsService, LayoutService } from '@app/core/services';
import { CoreState, fromCategories, fromLocations } from '@app/store';
import { Location } from '@app/shared/models';

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html',
  styleUrls: ['./location-editor.component.scss'],
})
export class LocationEditorComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  mode: 'edit' | 'create' = 'create';
  mapOptions!: google.maps.MapOptions;

  googleMapsApiLoaded$!: Observable<boolean>;
  categories$ = this._store.select(fromCategories.selectAll);

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private _destroyed$ = new Subject<void>();

  get id(): AbstractControl {
    return this.form.get('id') as AbstractControl;
  }

  get coordinates(): AbstractControl {
    return this.form.get('coordinates') as AbstractControl;
  }

  constructor(
    private _actions$: Actions,
    private _fb: FormBuilder,
    private _googleMapsService: GoogleMapsService,
    private _layoutService: LayoutService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store<CoreState>
  ) {}

  ngOnInit(): void {
    this.form = this._buildForm();
    this._layoutService.setToolbarPortal(this.portal);

    this.mapOptions = this._googleMapsService.defaultMapOptions;
    this.googleMapsApiLoaded$ = this._googleMapsService.apiLoaded$;

    this._store.dispatch(fromCategories.loadCategories());

    this._route.data
      .pipe(
        takeUntil(this._destroyed$),
        filter(({ location }) => !!location)
      )
      .subscribe(({ location }) => this._onLocationResolved(location));

    this._actions$
      .pipe(
        ofType(fromLocations.addLocationSuccess, fromLocations.updateLocationSuccess),
        takeUntil(this._destroyed$)
      )
      .subscribe(() => this._onSubmitSuccess());

    this._actions$
      .pipe(ofType(fromLocations.updateLocationFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onSubmitFailure(error));

    this._actions$
      .pipe(ofType(fromLocations.deleteLocationSuccess), takeUntil(this._destroyed$))
      .subscribe(() => this._onDeleteSuccess());

    this._actions$
      .pipe(ofType(fromLocations.deleteLocationFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onDeleteFailure(error));
  }

  onSetCoordinates(event: google.maps.MapMouseEvent): void {
    this.coordinates.setValue(event.latLng.toJSON());
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.mode === 'create'
        ? this._store.dispatch(fromLocations.addLocation({ location: this.form.value }))
        : this._store.dispatch(fromLocations.updateLocation({ location: this.form.getRawValue() }));
    }
  }

  onDeleteLocation(id: string): void {
    const modalRef = this._layoutService.openDeleteConfirmationModal('location');

    modalRef.closed.subscribe((confirmed) => {
      if (confirmed) {
        this._store.dispatch(fromLocations.deleteLocation({ id }));
      }
    });
  }

  private _onLocationResolved(location: Location): void {
    this.mode = 'edit';
    this.form.patchValue(location);
    this.mapOptions = { ...this.mapOptions, center: location.coordinates };
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
      address: [null, Validators.required],
      categoryIds: [[], Validators.required],
      coordinates: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.portal.detach();
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

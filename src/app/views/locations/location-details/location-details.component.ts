import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Location } from '@app/shared/models';
import { GoogleMapsService, LayoutService } from '@app/core/services';
import { CoreState, fromCategories, fromLocations } from '@app/store';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  location!: Location;
  mapOptions!: google.maps.MapOptions;

  googleMapsApiLoaded$!: Observable<boolean>;

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _actions$: Actions,
    private _googleMapsService: GoogleMapsService,
    private _layoutService: LayoutService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<CoreState>
  ) {}

  ngOnInit(): void {
    this.mapOptions = this._googleMapsService.defaultMapOptions;
    this.googleMapsApiLoaded$ = this._googleMapsService.apiLoaded$;

    this._store.dispatch(fromCategories.loadCategories());

    this._route.data
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ location }) => this._onLocationResolved(location));

    this._actions$
      .pipe(ofType(fromLocations.deleteLocationSuccess), takeUntil(this._destroyed$))
      .subscribe(() => this._onDeleteSuccess());

    this._actions$
      .pipe(ofType(fromLocations.deleteLocationFailure), takeUntil(this._destroyed$))
      .subscribe(({ error }) => this._onDeleteFailure(error));
  }

  private _onLocationResolved(location: Location): void {
    this.location = location;
    this._layoutService.setToolbarPortal(this.portal);
  }

  onDeleteLocation(): void {
    const modalRef = this._layoutService.openDeleteConfirmationModal('location');

    modalRef.closed.subscribe((confirmed) => {
      if (confirmed) {
        this._store.dispatch(fromLocations.deleteLocation({ id: this.location.id }));
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

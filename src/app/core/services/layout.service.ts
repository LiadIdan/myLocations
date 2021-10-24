import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';

import { fromCategories } from '@app/store';
import { ConfirmModalComponent } from '@app/shared/modals';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _toolbarPortal$ = new Subject<TemplatePortal>();

  get toolbarPortal$(): Observable<TemplatePortal> {
    return this._toolbarPortal$.asObservable();
  }

  constructor(private _modalService: NgbModal) {}

  setToolbarPortal(portal: TemplatePortal): void {
    this._toolbarPortal$.next(portal);
  }

  openDeleteConfirmationModal(collectionName: 'category' | 'location'): NgbModalRef {
    const ref = this._modalService.open(ConfirmModalComponent, { centered: true });

    ref.componentInstance.title = `Delete ${collectionName}`;
    ref.componentInstance.content = `Are you sure you want to permanently delete this ${collectionName}?`;

    return ref;
  }
}

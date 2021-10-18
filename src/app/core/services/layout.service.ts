import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _toolbarPortal$ = new Subject<TemplatePortal>();

  get toolbarPortal$(): Observable<TemplatePortal> {
    return this._toolbarPortal$.asObservable();
  }

  setToolbarPortal(portal: TemplatePortal): void {
    this._toolbarPortal$.next(portal);
  }
}

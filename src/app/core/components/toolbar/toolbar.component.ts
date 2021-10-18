import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { LayoutService } from '@app/core/services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  title$!: Observable<string | undefined>;
  portal$!: Observable<TemplatePortal>;

  constructor(private _router: Router, private _layoutService: LayoutService) {}

  ngOnInit(): void {
    this.portal$ = this._layoutService.toolbarPortal$;

    this.title$ = this._router.events.pipe(
      filter((event): event is RoutesRecognized => event instanceof RoutesRecognized),
      map((event) => event.state.root.firstChild?.data.title)
    );
  }
}

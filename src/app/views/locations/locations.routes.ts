import { Routes } from '@angular/router';

import { LocationResolver } from './location.resolver';
import { LocationsComponent } from './locations.component';
import { LocationEditorComponent } from './location-editor/location-editor.component';
import { LocationDetailsComponent } from './location-details/location-details.component';

export const LocationsRoutes: Routes = [
  {
    path: '',
    component: LocationsComponent,
  },
  {
    path: 'new',
    component: LocationEditorComponent,
  },
  {
    path: ':id',
    component: LocationEditorComponent,
    resolve: { location: LocationResolver },
  },
  {
    path: ':id/details',
    component: LocationDetailsComponent,
    resolve: { location: LocationResolver },
  },
];

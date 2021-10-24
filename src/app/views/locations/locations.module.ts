import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { LocationsRoutes } from './locations.routes';
import { LocationsComponent } from './locations.component';
import { LocationEditorComponent } from './location-editor/location-editor.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationCategoriesComponent } from './location-categories/location-categories.component';

@NgModule({
  declarations: [
    LocationsComponent,
    LocationCategoriesComponent,
    LocationDetailsComponent,
    LocationEditorComponent,
  ],
  imports: [
    CommonModule,
    PortalModule,
    NgSelectModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LocationsRoutes),
    SharedModule,
  ],
})
export class LocationsModule {}

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { CategoriesStoreModule } from './categories/categories.module';
import { LocationsStoreModule } from './locations/locations.module';

@NgModule({
  imports: [
    CategoriesStoreModule,
    LocationsStoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class CoreStoreModule {}

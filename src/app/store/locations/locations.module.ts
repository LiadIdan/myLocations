import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LocationEffects } from './effects';
import { key, locationsReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(key, locationsReducer),
    EffectsModule.forFeature([LocationEffects]),
  ],
})
export class LocationsStoreModule {}

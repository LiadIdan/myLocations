import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CategoryEffects } from './effects';
import { key, categoriesReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(key, categoriesReducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
})
export class CategoriesStoreModule {}

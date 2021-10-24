import { createAction, props } from '@ngrx/store';
import { UpdateStr } from '@ngrx/entity/src/models';

import { Location, CreateLocationDto } from '@app/shared/models';

export const loadLocations = createAction('[Location] Load Locations');
export const loadLocationsSuccess = createAction(
  '[Location] Load Locations Success',
  props<{ locations: Location[] }>()
);

export const loadLocation = createAction('[Location] Load Location', props<{ id: string }>());
export const loadLocationSuccess = createAction(
  '[Location] Load Location Success',
  props<{ location: Location }>()
);
export const loadLocationFailure = createAction(
  '[Location] Load Location Failure',
  props<{ error: Error }>()
);

export const addLocation = createAction(
  '[Location] Add Location',
  props<{ location: CreateLocationDto }>()
);
export const addLocationSuccess = createAction(
  '[Location] Add Location Success',
  props<{ location: Location }>()
);

export const updateLocation = createAction(
  '[Location] Update Location',
  props<{ location: UpdateStr<Location> }>()
);
export const updateLocationSuccess = createAction(
  '[Location] Update Location Success',
  props<{ location: Location }>()
);
export const updateLocationFailure = createAction(
  '[Location] Update Location Failure',
  props<{ error: Error }>()
);

export const deleteLocation = createAction('[Location] Delete Location', props<{ id: string }>());
export const deleteLocationSuccess = createAction(
  '[Location] Delete Location Success',
  props<{ id: string }>()
);
export const deleteLocationFailure = createAction(
  '[Location] Delete Location Failure',
  props<{ error: Error }>()
);

export const removeDeletedCategoryId = createAction(
  '[Location] Remove Deleted Category ID',
  props<{ categoryId: string }>()
);
export const removeDeletedCategoryIdSuccess = createAction(
  '[Location] Remove Deleted Category ID Success',
  props<{ locations: Location[] }>()
);

export const sortBy = createAction(
  '[Location] Sort By',
  props<{ property: StringKeys<Location> }>()
);

export const updateSelectedCategoryIds = createAction(
  '[Location] Update Selected Category IDs',
  props<{ ids: string[] }>()
);

export const setGroupByCategory = createAction(
  '[Location] Set Group By Category',
  props<{ groupByCategory: boolean }>()
);

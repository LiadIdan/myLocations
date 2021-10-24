import * as Categories from './categories';
import * as Locations from './locations';

export interface CoreState {
  [Categories.key]: Categories.State;
  [Locations.key]: Locations.State;
}

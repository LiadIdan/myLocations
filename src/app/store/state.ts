import * as Categories from './categories';

export interface CoreState {
  [Categories.key]: Categories.State;
}

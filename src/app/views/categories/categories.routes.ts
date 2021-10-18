import { Routes } from '@angular/router';

import { CategoryResolver } from './category.resolver';
import { CategoriesComponent } from './categories.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

export const CategoriesRoutes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'new',
    component: CategoryEditorComponent,
  },
  {
    path: ':id',
    component: CategoryEditorComponent,
    resolve: { category: CategoryResolver },
  },
  {
    path: ':id/details',
    component: CategoryDetailsComponent,
    resolve: { category: CategoryResolver },
  },
];

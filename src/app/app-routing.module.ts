import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '@app/views';
import { CategoriesRoutes } from '@app/views/categories';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'categories', children: CategoriesRoutes, data: { title: 'Categories' } },
  {
    path: 'locations',
    data: { title: 'Locations' },
    loadChildren: () => import('./views/locations/locations.module').then((m) => m.LocationsModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

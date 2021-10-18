import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@app/core/core.module';
import { CategoriesModule } from '@app/views/categories';
import { NotFoundComponent } from '@app/views';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [AppRoutingModule, CoreModule, CategoriesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

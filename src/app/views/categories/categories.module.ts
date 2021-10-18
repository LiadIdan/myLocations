import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryDetailsComponent, CategoryEditorComponent],
  imports: [CommonModule, PortalModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class CategoriesModule {}

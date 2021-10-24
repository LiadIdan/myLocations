import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormControlErrorsComponent, LoaderComponent } from './components';
import { CardComponent, CardBodyDirective, CardHeaderDirective } from './containers';
import { ConfirmModalComponent } from './modals';
import { CategoryIdToNamePipe } from './pipes';

const declarations = [ConfirmModalComponent];

const exportableDeclarations = [
  FormControlErrorsComponent,
  LoaderComponent,
  CardComponent,
  CardBodyDirective,
  CardHeaderDirective,
  CategoryIdToNamePipe,
];

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule, NgbModule],
  declarations: [...declarations, ...exportableDeclarations],
  exports: [FontAwesomeModule, NgbModule, ...exportableDeclarations],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoaderComponent } from './components';
import { CardComponent, CardBodyDirective, CardHeaderDirective } from './containers';
import { ConfirmModalComponent } from './modals';

const declarations = [ConfirmModalComponent];

const exportableDeclarations = [
  LoaderComponent,
  CardComponent,
  CardBodyDirective,
  CardHeaderDirective,
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

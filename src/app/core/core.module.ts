import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CoreStoreModule } from '@app/store/store.module';
import { SidebarComponent, ToolbarComponent } from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SidebarComponent, ToolbarComponent],
  imports: [BrowserModule, CommonModule, CoreStoreModule, PortalModule, RouterModule, SharedModule],
  exports: [SidebarComponent, SharedModule, ToolbarComponent],
})
export class CoreModule {}

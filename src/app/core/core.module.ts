import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CoreStoreModule } from '@app/store/store.module';
import { SidebarComponent, ToolbarComponent } from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SidebarComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreStoreModule,
    HttpClientModule,
    HttpClientJsonpModule,
    PortalModule,
    RouterModule,
    SharedModule,
  ],
  exports: [SidebarComponent, SharedModule, ToolbarComponent],
})
export class CoreModule {}

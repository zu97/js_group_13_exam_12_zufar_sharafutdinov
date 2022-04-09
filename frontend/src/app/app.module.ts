import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent,
    CenteredCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    FlexModule,
    AppRoutingModule,
    AppStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

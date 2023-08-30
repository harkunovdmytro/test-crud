import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreReducer, StoreReducerKey } from './store/reducer.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ [StoreReducerKey]: StoreReducer }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

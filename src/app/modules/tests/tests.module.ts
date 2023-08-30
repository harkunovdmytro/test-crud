import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsPageComponent } from './tests-page.component';
import { TestReviewComponent } from './test-review/test-review.component';


@NgModule({
  declarations: [
    TestsPageComponent,
    TestReviewComponent
  ],
  imports: [
    CommonModule,
    TestsRoutingModule
  ]
})
export class TestsModule { }

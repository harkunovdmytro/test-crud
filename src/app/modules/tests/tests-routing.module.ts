import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsPageComponent } from './tests-page.component';
import { TestReviewComponent } from './test-review/test-review.component';

const routes: Routes = [
  {
    path: 'review/:testResultId',
    component: TestReviewComponent
  },
  {
    path: '',
    component: TestsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {
}

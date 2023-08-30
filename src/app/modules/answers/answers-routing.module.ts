import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersPageComponent } from './answers-page.component';

const routes: Routes = [  {
  path: '',
  component: AnswersPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersPageComponent } from './answers-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassingTestComponent } from './passing-test/passing-test.component';


@NgModule({
  declarations: [
    AnswersPageComponent,
    PassingTestComponent
  ],
  imports: [
    CommonModule,
    AnswersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AnswersModule { }

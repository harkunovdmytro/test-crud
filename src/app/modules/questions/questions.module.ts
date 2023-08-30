import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsPageComponent } from './questions-page.component';
import { CreateEditQuestionFormComponent } from './components/create-edit-question-form/create-edit-question-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionsPageComponent,
    CreateEditQuestionFormComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }

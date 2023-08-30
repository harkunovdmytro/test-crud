import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    children: [
      {
        path: 'tests',
        loadChildren: () => import('./modules/tests/tests.module').then(m => m.TestsModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule)
      },
      {
        path: 'questions/:testId',
        loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule)
      },
      {
        path: 'answers',
        loadChildren: () => import('./modules/answers/answers.module').then(m => m.AnswersModule)
      },
      {
        path: 'answers/:testId',
        loadChildren: () => import('./modules/answers/answers.module').then(m => m.AnswersModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questions'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

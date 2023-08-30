import { Component } from '@angular/core';
import { ITest } from '../../models/test.model';
import { Store } from '@ngrx/store';
import { createEditTest } from '../../store/actions.store';
import { ActivatedRoute } from '@angular/router';
import { filter, pipe, switchMap } from 'rxjs';
import { selectTestWithId } from '../../store/selectors.store';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { QuestionType } from '../../models/question-types.model';

type IQuestionFormGroup = FormGroup<{
  title: FormControl<string | null>,
  type: FormControl<QuestionType | null>
  answer: FormControl<string | null>,
  answers: FormArray<IAnswerFormGroup>
}>;

type IAnswerFormGroup = FormGroup<{
  text: FormControl<string | null>,
  isCorrect: FormControl<boolean | null>
}>;

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent {
  currentTest: ITest | null = null;

  constructor(
    private store: Store,
    private router: ActivatedRoute
  ) {
    this.router.params.
    pipe(
      filter(({ testId }) => !!testId),
      switchMap(({ testId }) => this.store.select(selectTestWithId(testId)).pipe(
        filter(test => !!test)
      ))
    ).subscribe(test => this.currentTest = test);
  }

  public onCreateTest(test: ITest): void {
    this.store.dispatch(createEditTest({ test }));
  }

}

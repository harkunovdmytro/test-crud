import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ITest } from '../../models/test.model';
import { selectTestWithId } from '../../store/selectors.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ITestResult } from '../../models/test-result.model';
import { saveTestResult } from '../../store/actions.store';

@Component({
  selector: 'app-answers-page',
  templateUrl: './answers-page.component.html',
  styleUrls: ['./answers-page.component.scss']
})
export class AnswersPageComponent {
  public test: ITest | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.pipe(
      switchMap(({ testId }) => this.store.select(selectTestWithId(testId)))
    ).subscribe((test) => {
      if (!test) {
        this.router.navigate(['/form/tests']);
      }

      this.test = test;
    });
  }

  public saveResult(test: ITestResult): void {
    this.store.dispatch(saveTestResult({ test }));
    this.router.navigate(['/form/tests']);
  }
}

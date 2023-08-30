import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITest } from '../../models/test.model';
import { selectTestResults, selectTests } from '../../store/selectors.store';
import { Router } from '@angular/router';
import { deleteTest } from '../../store/actions.store';
import { ITestResult } from '../../models/test-result.model';

@Component({
  selector: 'app-test-page',
  templateUrl: './tests-page.component.html',
  styleUrls: ['./tests-page.component.scss']
})
export class TestsPageComponent {
  tests$: Observable<ITest[]> = this.store.select(selectTests);
  testsResults$: Observable<ITestResult[]> = this.store.select(selectTestResults);

  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  passTest(testId: string): void {
    this.router.navigate(['form/answers', testId]);
  }

  editTest(testId: string): void {
    this.router.navigate(['form/questions', testId]);
  }

  deleteTest(testId: string): void {
    this.store.dispatch(deleteTest({ testId }));
  }
  watchResul(testId: string): void {
    this.router.navigate(['form/tests/review', testId]);
  }
}

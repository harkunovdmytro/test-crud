import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { selectTestResultWithId } from '../../../store/selectors.store';
import { ITestResult } from '../../../models/test-result.model';

@Component({
  selector: 'app-test-review',
  templateUrl: './test-review.component.html',
  styleUrls: ['./test-review.component.scss']
})
export class TestReviewComponent {
  public testResult: ITestResult | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.pipe(
      switchMap(({ testResultId }) => this.store.select(selectTestResultWithId(testResultId)))
    ).subscribe((testResult) => {
      if (!testResult) {
        this.router.navigate(['/form/tests']);
      }

      this.testResult = testResult;
    });
  }

}

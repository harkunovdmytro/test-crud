import { createReducer, on } from '@ngrx/store';
import { ITest } from '../models/test.model';
import { ITestResult } from '../models/test-result.model';
import { createEditTest, deleteSavedTestResult, deleteTest, saveTestResult } from './actions.store';

export const StoreReducerKey = 'Store Reducer Key';

export interface IStoreReducerState {
  tests: ITest[];
  testResults: ITestResult[];
}

export const StoreReducerInitialState: IStoreReducerState = {
  tests: [],
  testResults: []
};

export const StoreReducer = createReducer(
  StoreReducerInitialState,
  on(deleteTest, (state, { testId }) => ({ ...state, tests: state.tests.filter(t => t.id !== testId) })),
  on(createEditTest, (state, { test }) => {
    const testIndex = state.tests.findIndex(t => t.id === test.id);

    if (testIndex !== -1) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.tests[testIndex] = test;

      return stateCopy;
    }

    return ({ ...state, tests: [...state.tests, test] });
  }),
  on(saveTestResult, (state, { test }) => ({ ...state, testResults: [...state.testResults, test] })),
  on(deleteSavedTestResult, (state, { testId }) => ({
    ...state,
    testResults: state.testResults.filter(t => t.id !== testId)
  })),
);

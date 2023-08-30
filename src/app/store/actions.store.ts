import { createAction, props } from '@ngrx/store';
import { ITest } from '../models/test.model';
import { ITestResult } from '../models/test-result.model';


// Test creating actions
export const createEditTest = createAction('[Test Creating] Create Test', props<{ test: ITest }>());
export const deleteTest = createAction('[Test Creating] Delete Test', props<{ testId: string }>());

// Test answering actions

export const saveTestResult = createAction('[Tes Passing] Save Test Result', props<{ test: ITestResult }>());
export const deleteSavedTestResult = createAction('[Tes Passing] Delete Saved Test Result', props<{ testId: string }>());

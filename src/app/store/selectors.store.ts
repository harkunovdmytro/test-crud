import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IStoreReducerState, StoreReducerKey } from './reducer.store';

export const StoreFeatureSelector = createFeatureSelector<IStoreReducerState>(StoreReducerKey);

export const selectTests = createSelector(StoreFeatureSelector, s => s.tests);
export const selectTestResults = createSelector(StoreFeatureSelector, s => s.testResults);
export const selectTestWithId = (testId: string) => createSelector(StoreFeatureSelector, s => s.tests.filter(t => t.id === testId)[0] || null);
export const selectTestResultWithId = (tryId: string) => createSelector(StoreFeatureSelector, s => s.testResults.filter(t => t.tryId === tryId)[0] || null);




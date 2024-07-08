import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data.state'; // Import your data state interface

export const selectDataFeature = createFeatureSelector<DataState>('data');

export const selectDataState = createSelector(
  selectDataFeature,
  (state: DataState) => state
);

export const selectLoading = createSelector(
  selectDataFeature,
  (state: DataState) => state.loading
);

export const selectData = createSelector(
  selectDataFeature,
  (state: DataState) => state.data
);

export const selectError = createSelector(
  selectDataFeature,
  (state: DataState) => state.error
);

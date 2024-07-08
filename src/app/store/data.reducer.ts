import { createReducer, on } from '@ngrx/store';
import { initialState } from './data.state';
import * as DataActions from './data.actions';

//Definir reducers para las acciones definidas.
export const dataReducer = createReducer(
  initialState,
  on(DataActions.loadData, (state) => ({ ...state, loading: true })),
  on(DataActions.loadDataSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(DataActions.loadDataFail, (state, { error }) => ({ ...state, loading: false, error }))
);

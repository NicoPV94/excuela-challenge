import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[Data] Load Data');
export const loadDataSuccess = createAction('[Data] Load Data Success', props<{ data: any }>());
export const loadDataFail = createAction('[Data] Load Data Fail', props<{ error: any }>());

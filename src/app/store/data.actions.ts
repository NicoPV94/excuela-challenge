import { createAction, props } from '@ngrx/store';

//Definir acciones para iniciar a cagar la data, guardar la data una vez haya sido cargada exitosamente
//y otra para manejar errores si la data falla en cargar.
export const loadData = createAction('[Data] Load Data');
export const loadDataSuccess = createAction('[Data] Load Data Success', props<{ data: any }>());
export const loadDataFail = createAction('[Data] Load Data Fail', props<{ error: any }>());

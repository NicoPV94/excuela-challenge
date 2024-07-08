export interface DataState {
  loading: boolean;
  data: any;
  error: any;
}

export const initialState: DataState = {
  loading: false,
  data: null,
  error: null,
};

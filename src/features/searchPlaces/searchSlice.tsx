import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  searchResultArr: [],
};

const searchSliceSlice = createSlice({
  name: 'searchResult_1',
  initialState,
  reducers: {
    searchResult: (state, action) => {
      let {data} = action.payload;
      state.searchResultArr = [action.payload, ...state.searchResultArr];
    },
  },
  extraReducers: builder => {},
});
export const {searchResult} = searchSliceSlice.actions;
export const searchResult_1 = searchSliceSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  lang: 'en',
};

function isPendingAction(action: {type: string}) {
  return action.type.endsWith('/pending');
}

function isFullfilledAction(action: {type: string}) {
  return action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: {type: string}) {
  return action.type.endsWith('/rejected');
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleLoader: state => {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction, state => {
        state.isLoading = true;
      })
      .addMatcher(isFullfilledAction, state => {
        state.isLoading = false;
      })
      .addMatcher(isRejectedAction, state => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {toggleLoader} = appSlice.actions;

export const app = appSlice.reducer;

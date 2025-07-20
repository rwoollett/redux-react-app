import { createReducer } from '@reduxjs/toolkit'
import { addCountdown, removeCountdown } from '../actions/data'
import { CountdownTimer } from '../../types/countdown'

interface DataReducer {
  timers: CountdownTimer[];
}

const initialState: DataReducer = {
  timers: []
};

const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
  builder.addCase(addCountdown, (state, action) => {
    if (state.timers) {
      state.timers.push(action.payload);
    } else {
      state.timers = [action.payload];
    }
  });
  builder.addCase(removeCountdown, (state, action) => {
    const indexRemove = state.timers.findIndex((item) => item.id === action.payload.id);
    state.timers.splice(indexRemove, 1);
  });
});

export default dataReducer;

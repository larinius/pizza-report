import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../store';
import { buildReport } from '../../../util/reportUtil';

export interface Order {
  toppings: string[];
  count: number;
  rank: number;
}

interface ReportState {
  data: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  orders: Order[];
}

const initialState: ReportState = {
  data: [],
  status: 'idle',
  error: null,
  orders: [],
};

export const fetchOrders = createAsyncThunk('report/fetchOrders', async () => {
  const url = `${process.env.REACT_APP_REPORT_API_URL}`;
  const response = await axios.get(url);
  return response.data;
});

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    saveFirst20Items: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (action.payload) {
            state.orders = buildReport(action.payload);
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { saveFirst20Items } = reportSlice.actions;
export default reportSlice.reducer;

export const getOrders = () => async (dispatch: AppDispatch) => {
  dispatch(fetchOrders());
};

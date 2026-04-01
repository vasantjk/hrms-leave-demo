import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApprovalRequest, ApprovalsState, RequestType } from './types';

const initialState: ApprovalsState = {
  requests: [
    {
      id: '1',
      user: {
        name: 'Marcus Chen',
        role: 'Senior UX Designer',
        team: 'Design Team',
        initials: 'MC',
      },
      type: RequestType.VACATION,
      details: 'Oct 24 — Oct 28 (5 Days)',
      description: '"Family wedding trip. Already synced with the dev team."',
      status: 'pending',
    },
    {
      id: '2',
      user: {
        name: 'Elena Rodriguez',
        role: 'Software Engineer',
        team: 'Platform Architecture',
        initials: 'ER',
      },
      type: RequestType.EXPENSE,
      details: '$1,240.50 • Tech Conference',
      description: 'Flight and hotel for React Summit 2024. Receipts attached.',
      status: 'pending',
    },
    {
      id: '3',
      user: {
        name: 'Julian White',
        role: 'Sales Executive',
        team: 'Growth Operations',
        initials: 'JW',
      },
      type: RequestType.HARDWARE,
      details: 'Dell UltraSharp 32" Monitor',
      description: 'Replacing faulty home office monitor for remote work.',
      status: 'pending',
    },
  ],
  filter: 'All Requests',
};

const approvalsSlice = createSlice({
  name: 'approvals',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    addRequest: (state, action: PayloadAction<ApprovalRequest>) => {
      state.requests.unshift(action.payload);
    },
    approveRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((r) => r.id === action.payload);
      if (request) {
        request.status = 'approved';
      }
    },
    rejectRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((r) => r.id === action.payload);
      if (request) {
        request.status = 'rejected';
      }
    },
  },
});

export const { setFilter, addRequest, approveRequest, rejectRequest } =
  approvalsSlice.actions;

export const store = configureStore({
  reducer: {
    approvals: approvalsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

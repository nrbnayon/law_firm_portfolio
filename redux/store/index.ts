// src/redux/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import practiceAreasReducer from "../features/practiceAreas/practiceAreasSlice";
import insightsReducer from "../features/insights/insightsSlice";
import contactReducer from "../features/contact/contactSlice";
import attorneysReducer from "../features/attorneys/attorneysSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    practiceAreas: practiceAreasReducer,
    insights: insightsReducer,
    contact: contactReducer,
    attorneys: attorneysReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

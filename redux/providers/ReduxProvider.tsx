// redux/providers/ReduxProvider.tsx
"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { loadUser } from "../features/auth/authSlice";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initialized.current) return;
    initialized.current = true;

    // Check if token exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (token) {
      // If token exists, load user data
      store.dispatch(loadUser());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

// // redux/providers/ReduxProvider.tsx
// import { Provider } from 'react-redux';
// import { store } from '../store';

// interface ReduxProviderProps {
//   children: React.ReactNode;
// }

// export const ReduxProvider = ({ children }: ReduxProviderProps) => {
//   return <Provider store={store}>{children}</Provider>;
// };

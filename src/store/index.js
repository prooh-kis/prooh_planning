import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

// Helper function to safely parse localStorage data
const getInitialUserState = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

// Get initial state
const getInitialState = () => ({
  userSignin: {
    userInfo: getInitialUserState(),
  },
});

// Create store with production-safe configuration
const store = configureStore({
  reducer: rootReducer,
  preloadedState: getInitialState(),

  // Disable Redux DevTools in production
  devTools: process.env.NODE_ENV !== "production",

  // Only enable middleware checks in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV !== "production",
      immutableCheck: process.env.NODE_ENV !== "production",
    }),
});

// Subscribe to store changes for persisting auth state
store.subscribe(() => {
  const state = store.getState();
  if (state.auth && state.auth.isLoggedIn && state.auth.userInfo) {
    try {
      localStorage.setItem(
        "user",
        JSON.stringify({
          userInfo: state.auth.userInfo,
          loginTime: state.auth.loginTime,
        })
      );
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
  }
});

export default store;

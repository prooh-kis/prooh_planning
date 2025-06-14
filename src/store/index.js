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

  // Configure middleware with optimized checks
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable immutable check in development if still too slow
      immutableCheck: process.env.NODE_ENV === 'production' ? false : {
        warnAfter: 150, // Further increased threshold
        ignoredPaths: [
          // Add known large state paths that don't need immutability checks
          'some.large.state.path',
          'another.large.state.path'
        ]
      },
      // Configure serializable check with optimized settings
      serializableCheck: {
        warnAfter: 150, // Increased threshold for serializable checks
        ignoredPaths: [
          // Add known non-serializable paths (like Date objects, functions, etc.)
          'payload.updatedAt',
          'payload.callback',
          'payload.meta.arg',
          'meta.arg',
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.response'
        ]
      },
      // Disable thunk check if not using it
      thunk: true
    }).filter(Boolean), // Remove any falsey values (like disabled middleware)
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

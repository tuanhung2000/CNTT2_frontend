import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import postSlice from "./features/postSlice";
const globalStore = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
export default globalStore;

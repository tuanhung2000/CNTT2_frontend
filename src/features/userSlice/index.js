import { createAsyncThunk, createSlice, serialize } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userInfor: [],
};
export const CallApiUser = createAsyncThunk(
  "user/callApiUser",
  async function ({ headers }) {
    try {
      const apiUserResponse = await axios.get(
        `http://localhost:5001/api/accounts/current`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );
      return apiUserResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
  // return apiUserResponse;
);
export default userSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ratingApi } from "./ratingApi";
import { fetchStoresThunk } from "../stores/storeThunks";

export const upsertRatingThunk = createAsyncThunk(
  "ratings/upsert",
  async ({ storeId, value, refetchParams }, { rejectWithValue, dispatch }) => {
    try {
      const res = await ratingApi.upsert(storeId, value);
      // refresh store list to get updated myRating/avg
      await dispatch(fetchStoresThunk(refetchParams));
      return res;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

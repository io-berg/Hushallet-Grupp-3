import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMyHouseholdsRequest } from "../utils/api";
import { Household } from "../utils/type";

// export interface HouseholdState = Household;
export interface HouseholdState {
  loading: boolean;
  households: Household[];
  current: Household | null;
}

const initialState: HouseholdState = {
  loading: false,
  households: [
    {
      id: 0,
      name: "Mock Hushållet",
      code: "123456",
      profiles: [
        {
          id: 0,
          user: {
            username: "Mock User",
            email: "mock@mock.com",
          },
          role: "admin",
          avatar: {
            color: "red",
            icon: "squid",
          },
          name: "Mock User",
        },
        {
          id: 1,
          user: {
            username: "user",
            email: "user@email.com",
          },
          role: "user",
          avatar: {
            color: "blue",
            icon: "squid",
          },
          name: "User",
        },
      ],
      tasks: [
        {
          id: 0,
          title: "Mock Task",
          description: "Mock Description",
          effort: 1,
          frequency: 1,
          taskHistory: [
            {
              id: 0,
              profileId: 0,
              date: new Date().toISOString(),
            },
          ],
        },
      ],
    },
  ],
  current: null,
};

export const fetchMyHouseholds = createAsyncThunk(
  "household/fetchMyHouseholds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMyHouseholdsRequest();
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const householdSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
    setCurrentHousehold: (state, action) => {
      state.current = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyHouseholds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMyHouseholds.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchMyHouseholds.fulfilled, (state, action) => {
      state.loading = false;
      state.households = action.payload;
    });
  },
});

export default householdSlice.reducer;
export const { setCurrentHousehold } = householdSlice.actions;

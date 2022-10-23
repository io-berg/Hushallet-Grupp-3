import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  applicationRequest,
  applicationResponseRequest,
  createHouseholdRequest,
  fetchMyHouseholdsRequest,
  transferOwnershipRequest,
} from "../utils/api";
import { Household } from "../utils/type";

export interface HouseholdState {
  loading: boolean;
  households: Household[];
  current: number | null;
  fetchInfo: { type: "success" | "error"; message: string } | null;
}

const initialState: HouseholdState = {
  loading: false,
  fetchInfo: null,
  households: [],
  // households: [
  //   {
  //     id: 0,
  //     name: "Mock Hushållet",
  //     code: "123456",
  //     profiles: [
  //       {
  //         id: 0,
  //         user: {
  //           username: "Mock User",
  //           email: "mock@mock.com",
  //         },
  //         role: "admin",
  //         avatar: {
  //           color: "red",
  //           icon: "squid",
  //         },
  //         name: "Mock User",
  //       },
  //       {
  //         id: 1,
  //         user: {
  //           username: "user",
  //           email: "user@email.com",
  //         },
  //         role: "user",
  //         avatar: {
  //           color: "blue",
  //           icon: "chicken",
  //         },
  //         name: "User",
  //       },
  //     ],
  //     tasks: [
  //       {
  //         id: 0,
  //         title: "Mock Task",
  //         description: "Mock Description",
  //         effort: 1,
  //         frequency: 1,
  //         taskHistory: [
  //           {
  //             id: 0,
  //             profileId: 0,
  //             date: new Date().toISOString(),
  //           },
  //         ],
  //       },
  //     ],
  //     applications: [],
  //   },
  // ],
  current: null,
};

export const fetchMyHouseholds = createAsyncThunk(
  "household/fetchMyHouseholds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMyHouseholdsRequest();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch");
    }
  }
);

export const sendApplication = createAsyncThunk<boolean, { code: string }>(
  "household/sendApplication",
  async (data, { rejectWithValue }) => {
    try {
      await applicationRequest(data.code);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendApplicationResponse = createAsyncThunk<boolean, { id: number; accept: boolean }>(
  "household/sendApplicationResponse",
  async (data, { rejectWithValue }) => {
    try {
      await applicationResponseRequest(data.id, data.accept);
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createHousehold = createAsyncThunk<Household, { name: string }>(
  "household/createHousehold",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createHouseholdRequest(data.name);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const transferOwnership = createAsyncThunk<string, { householdId: number; email: string }>(
  "household/transferOwnership",
  async (data, { rejectWithValue }) => {
    try {
      await transferOwnershipRequest(data.householdId, data.email);
      return data.email;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const householdSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
    setCurrentHousehold: (state, action) => {
      const selected = state.households.find((household) => household.id === action.payload.id);
      if (selected) {
        state.current = selected.id;
      }
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
    builder.addCase(sendApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendApplication.rejected, (state) => {
      state.loading = false;
      state.fetchInfo = { type: "error", message: "Ansökan misslyckades" };
    });
    builder.addCase(sendApplication.fulfilled, (state) => {
      state.loading = false;
      state.fetchInfo = { type: "success", message: "Ansökan skickad!" };
    });
    builder.addCase(createHousehold.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createHousehold.rejected, (state) => {
      state.loading = false;
      state.fetchInfo = { type: "error", message: "Skapandet av hushållet misslyckades" };
    });
    builder.addCase(createHousehold.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchInfo = { type: "success", message: "Hushållet skapat!" };
      state.households = [...state.households, action.payload];
    });
    builder.addCase(transferOwnership.fulfilled, (state, action) => {
      const current = state.households.find((household) => household.id === state.current);
      if (current) {
        current.profiles = current.profiles.map((p) => {
          if (p.role === "admin") {
            return { ...p, role: "user" };
          }
          if (p.user.email === action.payload) {
            return { ...p, role: "admin" };
          }
          return p;
        });
      }
    });
  },
});

export default householdSlice.reducer;
export const { setCurrentHousehold } = householdSlice.actions;

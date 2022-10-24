import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  applicationRequest,
  applicationResponseRequest,
  changeHouseholdNameRequest,
  createHouseholdRequest,
  fetchMyHouseholdsRequest,
  leaveHouseholdRequest,
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
            color: "#cd5d6f",
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
            color: "#fcd933",
            icon: "chicken",
          },
          name: "User",
        },
        {
          id: 2,
          user: {
            username: "user2",
            email: "wowee@email.com",
          },
          role: "user",
          avatar: {
            color: "#ff7e46",
            icon: "fox",
          },
          name: "User2",
        },
      ],
      tasks: [
        {
          id: 1,
          title: "Laga mat",
          description:
            "Kolla på kylskåpet vilken mat det är som ska lagas idag. Följ recept i receptboken som ligger på hyllan i köket",
          effort: 1,
          frequency: 1,
          taskHistory: [
            {
              id: 0,
              profileId: 0,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 1,
              profileId: 1,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 2,
              profileId: 2,
              date: new Date().toISOString(),
            },
          ],
        },
        {
          id: 2,
          title: "Damma",
          description:
            "Damma av alla ytor i alla rum. (ta bort dukar, blommor osv) Använd trasa, hink och rengöringsmedel som står i städskåpet i hallen.",
          effort: 1,
          frequency: 1,
          taskHistory: [
            {
              id: 0,
              profileId: 0,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 1,
              profileId: 1,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 2,
              profileId: 2,
              date: new Date().toISOString(),
            },
          ],
        },
        {
          id: 3,
          title: "Diska",
          description:
            "Lägg in disk i diskmaskin. Övrig disk, diskas för hand så som stekpannor tex",
          effort: 1,
          frequency: 1,
          taskHistory: [
            {
              id: 0,
              profileId: 2,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 1,
              profileId: 1,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 2,
              profileId: 0,
              date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
            },
            {
              id: 3,
              profileId: 2,
              date: new Date().toISOString(),
            },
            {
              id: 4,
              profileId: 2,
              date: new Date().toISOString(),
            },
            {
              id: 5,
              profileId: 2,
              date: new Date(new Date().setDate(new Date().getDate() - 32)).toISOString(),
            },
          ],
        },
        {
          id: 4,
          title: "Ta hand om My",
          description: "Ut och gå med My 4 gånger om dagen, ge mat morgon och kväll.",
          effort: 1,
          frequency: 1,
          taskHistory: [
            {
              id: 0,
              profileId: 0,
              date: new Date().toISOString(),
            },
            {
              id: 1,
              profileId: 1,
              date: new Date().toISOString(),
            },
          ],
        },
        {
          id: 5,
          title: "Torka golvet",
          description: "Torka av golvet med mopp och rengöring som står i städskåpet",
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
        {
          id: 6,
          title: "Vattna blommor",
          description: "Vattna alla blommor, ej plastblommorna ;)",
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
      applications: [],
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
      return rejectWithValue("Failed to send application");
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

export const changeHouseholdName = createAsyncThunk<string, { householdId: number; name: string }>(
  "household/changeHouseholdName",
  async (data, { rejectWithValue }) => {
    try {
      await changeHouseholdNameRequest(data.householdId, data.name);
      return data.name;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const leaveHousehold = createAsyncThunk(
  "household/leaveHousehold",
  async (householdId: number, { rejectWithValue }) => {
    try {
      const response = await leaveHouseholdRequest(householdId);
      if (response) {
        return householdId;
      }
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
    builder.addCase(changeHouseholdName.fulfilled, (state, action) => {
      const current = state.households.find((household) => household.id === state.current);
      if (current) {
        current.name = action.payload;
      }
    });
    builder.addCase(leaveHousehold.fulfilled, (state, action) => {
      state.households = state.households.filter((h) => h.id !== action.payload);
      state.current = null;
    });
  },
});

export default householdSlice.reducer;
export const { setCurrentHousehold } = householdSlice.actions;

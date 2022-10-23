import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { applicationRequest, createHouseholdRequest, fetchMyHouseholdsRequest } from "../utils/api";
import { Household, Profile } from "../utils/type";

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
            color: "#ee7e86",
            icon: "🐙",
            token: true,
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
            icon: "chicken",
            token: true,
          },
          name: "User",
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
              profileId: 0,
              date: new Date().toISOString(),
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

export const sendApplication = createAsyncThunk<Household[], { code: string }>(
  "household/sendApplication",
  async (data, { rejectWithValue }) => {
    try {
      const response = await applicationRequest(data.code);
      return response;
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

    updateProfileInCurrentHousehold: (state, action) => {
      const current = state.households.find((household) => household.id === state.current);
      if (current) {
        const index = state.households.indexOf(current);

        state.households[index].profiles[action.payload.id] = {
          ...action.payload,
        };
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
  },
});

export default householdSlice.reducer;
export const { setCurrentHousehold, updateProfileInCurrentHousehold } = householdSlice.actions;

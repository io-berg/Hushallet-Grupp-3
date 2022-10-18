import { createSlice } from "@reduxjs/toolkit";
import { Household } from "../utils/type";

// export interface HouseholdState = Household;

const initialState: Household[] = [
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
];

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {},
});

export default householdSlice.reducer;
export const {} = householdSlice.actions;

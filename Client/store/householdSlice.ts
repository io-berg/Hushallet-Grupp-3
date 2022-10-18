import { createSlice } from "@reduxjs/toolkit";
import { Household } from "../utils/type";
import avatars from "../utils/mockdata";

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
          color: "#ED5949",
          icon: "🐙",
          token: true,
        },
        name: "Mock User",
      },
    ],
    avatars: [
      {
        color: "#ee7e86",
        icon: "🐙",
        token: false,
      },
      {
        color: "#f7ad71",
        icon: "🦊",
        token: false,
      },
      {
        color: "#f795e0",
        icon: "🦄",
        token: false,
      },
      {
        color: "#94c3f9",
        icon: "🐋",
        token: false,
      },
      {
        color: "#af7e5f",
        icon: "🦉",
        token: false,
      },
      {
        color: "#f9c9c9",
        icon: "🐷",
        token: false,
      },
      {
        color: "#79f189",
        icon: "🐸",
        token: false,
      },
      {
        color: "#f1ec79",
        icon: "🐥",
        token: false,
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

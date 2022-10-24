import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const lightTheme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#000",
    accent: "#ffff",
    surface: "white",
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  roundness: 10,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#ffff",
    accent: "#000",
    surface: "#181818",
  },
};

export { lightTheme, darkTheme };

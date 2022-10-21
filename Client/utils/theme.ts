import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const lightTheme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FFFFFF",
    accent: "#000000",
  },
};
const darkTheme = {
  ...MD3DarkTheme,
  roundness: 10,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#000000",
    accent: "#FFFFFF",
  },
};

const theme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FFFFFF",
    accent: "#000000",
  },
};

export { lightTheme, darkTheme, theme };

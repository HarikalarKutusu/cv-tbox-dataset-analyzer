import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b71c1c",
    },
    secondary: {
      main: "#1cb7b7",
    },
  },
});

export const appTheme = responsiveFontSizes(theme);

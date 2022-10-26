import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const PRIMARY_COLOR = "#b71c1c";;
export const SECONDARY_COLOR = "#1cb7b7";;

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
});

export const appTheme = responsiveFontSizes(theme);

// import { createTheme } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import { responsiveFontSizes } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f50b5",
    },
    secondary: {
      main: red[500],
    },
  },
  typography: {
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
    },
  },
});

export default responsiveFontSizes(theme);

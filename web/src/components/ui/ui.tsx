import * as React from "react";
import intl from "react-intl-universal";
import { NavLink as Link, Outlet } from "react-router-dom";

// MUI
import {
  styled,
  ThemeProvider,
  CssBaseline,
  Drawer as MuiDrawer,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // ListSubheader,,
} from "@mui/material";

// import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Home
import HomeIcon from "@mui/icons-material/Home";
// Browse
import ListIcon from "@mui/icons-material/List";

// APP
import { appTheme } from "./theme";
import { useStore } from "./../../stores/store";
import { LanguageSelector } from "./../languageSelector";
import { FilterSelectors } from "../filterSelectors";
import { GraphBuilder } from "../graphBuilder";
import { AppInfo } from "./appInfo";

//
// UI
//

// Copyright

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export function AppUI() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { initDone } = useStore();

  // Menu Items

  const MenuItemsTable = () => {
    return (
      <>
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "darkgray",
            fontWeight: "bolder",
          }}
        >
          <ListItemButton
            title={intl.get("menu.home")}
            aria-label={intl.get("menu.home")}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={intl.get("menu.home")} />
          </ListItemButton>
        </Link>
        <Link
          to={"/browse"}
          style={{
            textDecoration: "none",
            color: "darkgray",
            fontWeight: "bolder",
          }}
        >
          <ListItemButton
            title={intl.get("menu.browse")}
            aria-label={intl.get("menu.browse")}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={intl.get("menu.browse")} />
          </ListItemButton>
        </Link>
      </>
    );
  };

  return !initDone ? (
    <></>
  ) : (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "12px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              title={intl.get("ui.action.open-menu")}
              aria-label={intl.get("ui.action.open-menu")}
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              align="left"
              sx={{ flexGrow: 1 }}
            >
              {intl.get("app.title")}
            </Typography>
            <LanguageSelector />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton
              title={intl.get("ui.action.close-menu")}
              aria-label={intl.get("ui.action.close-menu")}
              onClick={toggleDrawer}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MenuItemsTable />
          </List>
          <AppInfo />
          {/* <div
            style={{
              width: "100%",
              textAlign: "center",
              verticalAlign: "bottom",
              position: "absolute",
              bottom: 40,
              fontSize: "9px",
            }}
          >
            v0.3.0 beta
            <br />
            data:
            <br />
            2022-10-22
          </div> */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "97vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}> */}
                  <Outlet />
                {/* </Paper> */}
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <FilterSelectors />
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

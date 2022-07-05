import React from "react";
import logo from '../../assets/images/logo-small.png'
import { useUser } from "../../components/Auth/User";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { styled } from "@mui/system";
import { BottomMenuList, SideMenuList, TopMenuList } from "../../routes/Menu";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import TopMenu from "./TopMenu";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    width: `0px`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Menu = (props) => {
  const { window } = props;
  const { user } = useUser()
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerCloseMobile = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(false);
  };

  const drawMenuList = list => {
    return list.map((item) => {
      if (item.logged && !user) {
        return null
      }
      return (
        <ListItemButton
          key={item.key}
          component={Link} 
          to={item.to} 
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: '#B12823',
            }}
          >
            {item.icon()}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{ 
              opacity: open ? 1 : 0,
              whiteSpace: 'break-spaces'
            }}
          />
        </ListItemButton>
      )
    })
  }

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Box>
      {!user && (
        <AppBar position="fixed" open={false}>
          <Toolbar>
            <Avatar alt="IOSPER" src={logo} />
            <Typography variant="h6" noWrap component="div" ml={2}>
              ELECCIONES
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      )}

      
        <>
          <AppBar position="fixed" open={(open)}>
            <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              
              {!open && <Avatar alt="IOSPER" src={logo} />}
              {!open && (
                  <Typography variant="h6" noWrap component="div" ml={2}>
                    ELECCIONES
                  </Typography>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <TopMenu list={TopMenuList}/>
            </Toolbar>
          </AppBar>

          <MuiDrawer
            anchor="left"
            container={container}
            open={open}
            onClose={handleDrawerCloseMobile}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DrawerHeader>
              {open && <Avatar alt="IOSPER" src={logo} />}
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Box
              onClick={handleDrawerCloseMobile}
              onKeyDown={handleDrawerCloseMobile}
            >
              <List>{drawMenuList(SideMenuList)}</List>
              <Divider />
              <List>{drawMenuList(BottomMenuList)}</List>
            </Box>
          </MuiDrawer>
  
          <Drawer 
            variant="permanent" 
            open={open}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <DrawerHeader>
              {open && <Avatar alt="IOSPER" src={logo} />}
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>{drawMenuList(SideMenuList)}</List>
            <Divider />
            <List>{drawMenuList(BottomMenuList)}</List>
          </Drawer>
        </>
      
    </Box>
  );
};

export default Menu;

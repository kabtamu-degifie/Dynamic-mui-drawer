import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openedMenu, setOpenedMenu] = React.useState([]);

  const handleClick = (menu) => {
    const menus = [...openedMenu];
    const index = menus.indexOf(menu.id);
    if (index !== -1) {
      menus.splice(index, 1);
    } else {
      menus.push(menu.id);
    }
    setOpenedMenu(menus);
  };

  const isSelectedMenu = (menu) => {
    return openedMenu.indexOf(menu.id) !== -1;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      id: 1,
      url: "/",
      text: "Dashboard",
      icon: <InboxIcon />,
    },

    {
      id: 2,
      text: "Accounts",
      icon: <InboxIcon />,
      children: [
        {
          id: 3,
          url: "/role",
          text: "Role",
          icon: <MailIcon />,
        },
        {
          id: 4,
          url: "/user",
          text: "User",
          icon: <MailIcon />,
        },
        {
          id: 5,
          text: "Students",
          icon: <MailIcon />,
          children: [
            {
              id: 6,
              text: "Summer",
              icon: <MailIcon />,
              children: [
                {
                  id: 7,
                  url: "/role",
                  text: "Batch 1",
                  icon: <MailIcon />,
                },
                {
                  id: 8,
                  url: "/user",
                  text: "Batch 2",
                  icon: <MailIcon />,
                },
              ],
            },
            {
              id: 9,
              url: "/user",
              text: "Regular",
              icon: <MailIcon />,
            },
          ],
        },
      ],
    },
    {
      id: 10,
      text: "Accounts 1",
      icon: <InboxIcon />,
      children: [
        {
          id: 11,
          url: "/role1",
          text: "Role 1",
          icon: <MailIcon />,
        },
        {
          id: 12,
          url: "/user1",
          text: "User 1",
          icon: <MailIcon />,
        },
      ],
    },
  ];

  const getMenuWithChildren = (menu, pl = 2) => {
    return (
      <React.Fragment key={menu.id}>
        <ListItemButton sx={{ pl }} onClick={() => handleClick(menu)}>
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <ListItemText primary={menu.text} />
          {isSelectedMenu(menu) ? <ExpandMore /> : <ChevronRightIcon />}
        </ListItemButton>
        <Collapse in={isSelectedMenu(menu)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu.children.map((child) => {
              if (child.children) {
                return getMenuWithChildren(child, pl + 2);
              }
              return (
                <ListItemButton key={child.id} sx={{ pl: pl + 2 }}>
                  <ListItemIcon>{child.icon}</ListItemIcon>
                  <ListItemText primary={child.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((menuItem) => {
            if (menuItem.children) {
              return getMenuWithChildren(menuItem);
            }
            return (
              <ListItem key={menuItem.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
}

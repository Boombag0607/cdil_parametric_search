import { useState, useEffect } from "react";
import AddDevice from "./Add/Device";
import AddCategory from "./Add/Category";
import AddPackage from "./Add/Package";
import AddIndustry from "./Add/Industry";
import ChangeDevice from "./Change/Device";
import ChangeCategory from "./Change/Category";
import ChangePackage from "./Change/Package";
import ChangeIndustry from "./Change/Industry";
import AdminLoginPage from "./AdminOAuth";
import { styled } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Autocomplete,
  Box,
  Button,
  CssBaseline,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import AdminProfile from "./Profile";
import axios from "axios";

const OPTIONS = [
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Device",
    value: "device",
  },
  {
    label: "Package",
    value: "package",
  },
  {
    label: "Industry",
    value: "industry",
  },
];

const DRAWERWIDTH = 280;

function AddOrChange(props) {
  const { type, signal, handleSignalChange } = props;
  const [add, setAdd] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (!signal) {
      setAdd(false);
      setChange(false);
    }
  }, [signal]);

  const handleClickAdd = (event) => {
    console.log("Add");
    setAdd(true);
    setChange(false);
    handleSignalChange();
  };

  const handleClickChange = (event) => {
    console.log("Change");
    setChange(true);
    setAdd(false);
    handleSignalChange();
  };

  return (
    <Grid container sx={{ m: 3 }}>
      {add || change ? (
        <Grid item>
          {add ? (
            <Box>
              {type === "device" ? (
                <AddDevice />
              ) : type === "category" ? (
                <AddCategory />
              ) : type === "package" ? (
                <AddPackage />
              ) : type === "industry" ? (
                <AddIndustry />
              ) : null}
            </Box>
          ) : (
            <Box>
              {type === "device" ? (
                <ChangeDevice />
              ) : type === "category" ? (
                <ChangeCategory />
              ) : type === "package" ? (
                <ChangePackage />
              ) : type === "industry" ? (
                <ChangeIndustry />
              ) : null}
            </Box>
          )}
        </Grid>
      ) : (
        <Box>
          <Button variant="contained" onClick={handleClickAdd}>
            Add
          </Button>
          <Button disabled>OR</Button>
          <Button variant="contained" onClick={handleClickChange}>
            Change
          </Button>
        </Box>
      )}
    </Grid>
  );
}

const openedMixin = (theme) => ({
  width: DRAWERWIDTH,
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
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWERWIDTH,
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function AdminComponent() {
  const [isAdminAuthorised, setIsAdminAuthorised] = useState(true);
  const [signalAddOrChange, setSignalAddOrChange] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState();

  const handleDrawerToggle = () => {
    setProfileDrawerOpen(!profileDrawerOpen);
  };

  const checkAdminAuthorization = async () => {
    try {
      const response = await axios.get("/admin");
      if (response.status === 200) {
        setIsAdminAuthorised(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   useEffect(() => checkAdminAuthorization(), []);


  const handleChange = (event, newValue) => {
    console.log(newValue);
    setSelectedType(newValue);
    setSignalAddOrChange(false);
  };

  const handleSignalChange = () => {
    console.log("Change the signal");
    setSignalAddOrChange(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={profileDrawerOpen}
        sx={{ zIndex: (theme) => theme.zIndex - 1 }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {profileDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            {profileDrawerOpen ? (
              <AdminProfile />
            ) : (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: profileDrawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
              </ListItemButton>
            )}
          </ListItem>
          <ListItem disablePadding key={`Add Another Admin`}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: profileDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: profileDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Another Admin" />
            </ListItemButton>
          </ListItem>
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: profileDrawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: profileDrawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} open={profileDrawerOpen}>
        <DrawerHeader />
        <Typography variant="h2" component="h2">
          Admin DashBoard
        </Typography>
        <Grid container spacing={2} sx={{ height: "50vh" }}>
          {isAdminAuthorised ? (
            <Box sx={{ m: 4 }}>
              <Grid item>
                <FormGroup>
                  <Autocomplete
                    id="admin-choices"
                    options={OPTIONS}
                    value={selectedType}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select a type to add or change"
                      />
                    )}
                  />
                </FormGroup>
              </Grid>
              <Grid item>
                {selectedType !== undefined || null ? (
                  <AddOrChange
                    type={selectedType?.value}
                    signal={signalAddOrChange}
                    handleSignalChange={handleSignalChange}
                  />
                ) : null}
              </Grid>
            </Box>
          ) : (
            <AdminLoginPage />
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminComponent;

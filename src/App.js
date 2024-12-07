import React, { useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  CssBaseline,
  Container,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  Button,
  CircularProgress
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AdbIcon from '@mui/icons-material/Adb';
import NewTask from './NewTask';
import NextTask from './NextTask';
import ProfilePage from './ProfilePage';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function App() {
  const [tabValue, setTabValue] = useState(2); // Start with the welcome tab active
  const [themeMode, setThemeMode] = useState('light');
  const [loading, setLoading] = useState(false);
  const settings = ['Profile', 'Logout'];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState({
    name: 'Diya James',
    avatar: '/images/diya.jpg',
  });

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSaveChanges = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ boxShadow: 4 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              onClick={() => setTabValue(2)} // Navigate to the welcome tab on logo click
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ToodleDo
            </Typography>
            <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
              <Tabs
                textColor="inherit"
                indicatorColor="primary"
                value={tabValue}
                onChange={handleChange}
                aria-label="tabs example"
              >
                <Tab
                  label="Add-a-Doo"
                  sx={{
                    fontWeight: tabValue === 0 ? 'bold' : 'normal',
                    textTransform: 'capitalize',
                  }}
                />
                <Tab
                  label="To-Do Peek"
                  sx={{
                    fontWeight: tabValue === 1 ? 'bold' : 'normal',
                    textTransform: 'capitalize',
                  }}
                />
              </Tabs>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src={user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem >
              <ProfilePage user={user} onSaveChanges={handleSaveChanges} />
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
            </MenuItem>
          </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Welcome Page Tab Content */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ padding: 3, backgroundColor: theme.palette.background.paper, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            🎉 Welcome to ToodleDo! 🎉
          </Typography>
          
          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
            {greeting()} We're thrilled to help you manage your tasks. Let's get started! 😄
          </Typography>
          
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              "The journey of a thousand tasks begins with a single step!"
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: '10px 20px', fontSize: '1.1rem' }}
              onClick={() => setTabValue(0)}
            >
              Get Started
            </Button>
            {loading && (
              <CircularProgress sx={{ marginTop: 2 }} />
            )}
          </Box>
          
          {/* <Typography variant="body2" color="textSecondary">
            Need help? Check our guide or contact support.
          </Typography> */}
        </Box>
      </TabPanel>

      {/* Other Tabs */}
      <TabPanel value={tabValue} index={0}>
        <NewTask />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <NextTask />
      </TabPanel>
    </ThemeProvider>

    
  );
}

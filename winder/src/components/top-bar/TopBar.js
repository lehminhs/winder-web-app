import './TopBar.css'

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';


import TopMenu from './top-menu/TopMenu'
import CreateModal from '../create-modal/CreateModal';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

import { fetchUsers } from '../../actions/auth';

import store from '../../store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const TopBar = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    store.dispatch({ type: 'LOGOUT' });
    navigate('/login');

    setUser(null);
  }

  const handleRefresh = () => {
    props.refresh();
  }

  const handleSearch = (e) => {
    props.search(e.target.value);
  }

  useEffect(() => {
    const token = user?.token;
    handleRefresh();

    if (!token) {
      navigate('/login');
    } else {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <CreateModal refresh={handleRefresh} users={props.users} />
            <Search sx={{ marginRight: '24px', marginLeft: '24px !important' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleSearch}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button sx={{ color: 'white' }} onClick={handleRefresh}>
              <RefreshIcon />
            </Button>
          </Box>
          <Button className="topbar__button" variant="text" sx={{ color: 'white' }} onClick={logout}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
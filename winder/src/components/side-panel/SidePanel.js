import './SidePanel.css';

import { useState, useEffect, useContext } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import MainCard from './main-card/MainCard';
import LoadingScreen from './../loading-screen/LoadingScreen'

import { GlobalContext } from '../../Contexts';

import store from '../../store';

const SidePanel = (props) => {
  const [display, setDisplay] = useState(props.allTasks);
  const [currentTab, setCurrentTab] = useState(0);

  const { contextValue } = useContext(GlobalContext);

  //change display (array that is mapped for rendering of main cards) depending on tabs
  const handleRefresh = () => {
    props.refresh();
  }

  const handleDisplay = (tab) => {
    setCurrentTab(tab);
    switch (tab) {
      case 0:
        setDisplay(props.allTasks);
        break;
      case 1:
        setDisplay(props.allTasks.filter((task) => {
          return task.assignee == contextValue.userId;
        }));
        break;
      case 2:
        setDisplay(props.allTasks.filter((task) => {
          return task.creator == contextValue.userId;
        }));
        break;
      case 3:
        setDisplay(props.completed);
        break;
      default:
        setDisplay(props.allTasks);
        break;
    }
  }

  useEffect(() => {
    setDisplay(props.allTasks);
  }, []);

  return (
    <Box className="sidepanel__container"
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Box
        orientation="vertical"
        variant="scrollable"
        value={0}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}
      >
        <Tab label="All Open" onClick={() => { handleDisplay(0) }}
          className={(currentTab == 0 ? 'sidepanel__selected sidepanel__tab' : 'sidepanel__tab')} />
        <Tab label="Assigned To Me" onClick={() => { handleDisplay(1) }}
          className={(currentTab == 1 ? 'sidepanel__selected sidepanel__tab' : 'sidepanel__tab')} />
        <Tab label="Created By Me" onClick={() => { handleDisplay(2) }}
          className={(currentTab == 2 ? 'sidepanel__selected sidepanel__tab' : 'sidepanel__tab')} />
        <Tab label="Completed" onClick={() => { handleDisplay(3) }}
          className={(currentTab == 3 ? 'sidepanel__selected sidepanel__tab' : 'sidepanel__tab')} />
      </Box>
      {props.loading && (
        <Box>
          <LoadingScreen />
        </Box>
      )}
      {!props.loading && (
        <Box className="sidepanel__content" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
          <Grid container>
            <Grid item xs={4} className="sidepanel__header">
              Title
            </Grid>
            <Grid item xs={1} className="sidepanel__header">
              #
            </Grid>
            <Grid item xs={2} className="sidepanel__header">
              Assignee
            </Grid>
            <Grid item xs={2} className="sidepanel__header">
              Date
            </Grid>
            <Grid item xs={2} className="sidepanel__header">
              Status
            </Grid>
            <Grid item xs={1} className="sidepanel__header">
              Priority
            </Grid>
          </Grid>
          <Box sx={{ overflow: 'auto', height: { sm: 'calc(100vh - 137px)', xs: 'calc(100vh - 121px)' }, boxSizing: 'border-box' }}>
            {
              display.map(el => <MainCard key={el._id} refresh={handleRefresh} taskId={el._id} users={props.users} ticketNumber={el.ticketNumber} title={el.title} assignee={el.assignee} assigneeName={el.assigneeName} date={el.createdAtShort} status={el.status} priority={el.priority} description={el.description} creator={el.creator} creatorName={el.creatorName} />)
            }
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default SidePanel;
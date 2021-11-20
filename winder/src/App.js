import './App.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router';
import decode from 'jwt-decode';

import { GlobalContext } from './Contexts';
import store from './store';

import TopBar from './components/top-bar/TopBar';
import SidePanel from './components/side-panel/SidePanel';

import { fetchUser, fetchUsers } from './actions/auth';
import { fetchTasks } from './actions/tasks';

const ContextWrapper = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  )
}
const initialContext = {
  name: '',
  userId: ''
}
const AppWrapper = () => {
  const [contextValue, setContextValue] = useState(initialContext);

  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const result = profile?.result;
    const token = profile?.token;
    try {
      const decodedToken = decode(token);
      if (decodedToken.id) {
        setContextValue({ ...contextValue, ['name']: result.name, ['userId']: decodedToken.id });
      } else {
        if (decodedToken.sub) {
          store.dispatch(fetchUser(decodedToken.sub))
            .then((res) => {
              setContextValue({ ...contextValue, ['name']: result.name, ['userId']: res.payload });
            })
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserIdFromToken();
  }, [])

  return (
    <GlobalContext.Provider value={{ contextValue }}>
      <App />
    </GlobalContext.Provider>
  )
}

const App = () => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]); 
  const [allTasks, setAllTasks] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);

  const getTasks = () => {
    setLoading(true);

    store.dispatch(fetchTasks())
      .then((res) => {
        setLoading(false);

        // Set allTasks to be all uncompleted tasks
        setAllTasks(res.payload.filter((task) => {
          return task.status != 'COMPLETED';
        }));

        //Set completed to be all ctasks with completed status
        setCompleted(res.payload.filter((task) => {
          return task.status == 'COMPLETED';
        }));

        setFilteredTasks(res.payload.filter((task) => {
          return task.status != 'COMPLETED';
        }));

        setFilteredCompleted(res.payload.filter((task) => {
          return task.status == 'COMPLETED';
        }));
      })
  }

  //Dispatch action to get all the registered users
  const getUsers = () => {
    store.dispatch(fetchUsers())
      .then((res) => {
        setUsers(res.payload);
      })
  }

  const refresh = () => {
    setUsers([]);
    setAllTasks([]);
    setCompleted([]);

    setFilteredTasks([]);
    setFilteredCompleted([]);

    getUsers();
    getTasks();
  }

  const search = (filter) => {
     const lowercaseFilter = filter.toLowerCase();
    if ( lowercaseFilter == '' ) {
      setFilteredTasks(allTasks);
      setFilteredCompleted(completed);
    } else {
      setFilteredTasks(allTasks.filter(task => 
        (task.title.toLowerCase().search(lowercaseFilter) > -1 || 
        task.createdAtShort.toLowerCase().search(lowercaseFilter) > -1 || 
        task.creatorName.toLowerCase().search(lowercaseFilter) > -1 || 
        task.status.toLowerCase().search(lowercaseFilter) > -1 ||
        task.assigneeName.toLowerCase().search(lowercaseFilter) > -1)));

      setFilteredCompleted(completed.filter(completed => 
        completed.title.toLowerCase().search(lowercaseFilter) > -1 || 
        completed.createdAtShort.toLowerCase().search(lowercaseFilter) > -1 || 
        completed.creatorName.toLowerCase().search(lowercaseFilter) > -1 || 
        completed.status.toLowerCase().search(lowercaseFilter) > -1 ||
        completed.assigneeName.toLowerCase().search(lowercaseFilter) > -1));
    }
  }

  useEffect(() => {
    refresh();
  }, [])

  return (
    <div className="app">
      <TopBar users={users} refresh={refresh} search={search} />
      <SidePanel key={filteredTasks} refresh={refresh} users={users} allTasks={filteredTasks} completed={filteredCompleted} loading={loading}/>
    </div>
  );
}

export default ContextWrapper;
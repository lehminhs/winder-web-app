import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { createTask } from './../../actions/tasks'

import { GlobalContext } from '../../Contexts';

import store from './../../store';
import { useNavigate } from 'react-router';


import './CreateModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialState = { title: '', description: '', assignee: '', assigneeName: '', priority: '', creator: '' };

const CreateModal = (props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');

  const { contextValue } = useContext(GlobalContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    store.dispatch(createTask(form))
      .then((res) => {
        if (res) {
          setForm(initialState);
          setAssignee('');
          setPriority('');

          handleRefresh();
          
          handleClose();
        }
      })
  }

  const handleChange = (e) => {
    if (e.target.name == 'assignee') {
      setAssignee(e.target.value);

      setForm({ ...form, ['creator']: contextValue.userId, ['creatorName']: contextValue.name, ['assigneeName']: props.users[e.target.value]['name'], ['assignee']: props.users[e.target.value]['id']});
    } else if (e.target.name == 'priority') {
      setPriority(e.target.value);
      setForm({ ...form, ['creator']: contextValue.userId, ['creatorName']: contextValue.name, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, ['creator']: contextValue.userId, ['creatorName']: contextValue.name, [e.target.name]: e.target.value });
    }
  }

  const handleRefresh = () => {
    props.refresh();
  }

  return (
    <div>
      <Button className="topbar__button" variant="text" sx={{ color: 'white' }} onClick={handleOpen}>CREATE TASK</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
            Create Task
          </Typography>
          <TextField
            id="title"
            name="title"
            label="Title"
            onChange={event => {
              handleChange(event);
            }}
            sx={{ width: 1, marginBottom: '16px' }}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            onChange={event => {
              handleChange(event);
            }}
            sx={{ width: 1, marginBottom: '16px' }}
          />
          <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', marginBottom: '38px' }} >
            <FormControl variant="standard" sx={{ width: '125px' }}>
              <InputLabel id="assignee">Assignee</InputLabel>
              <Select
                labelId="assignee"
                id="assignee"
                name="assignee"
                label="Assignee"
                autowidth="true"
                value={assignee}
                onChange={event => {
                  handleChange(event);
                }}
              >
                {
                  props.users.map((user, index) => 
                    <MenuItem key={user.id} value={index}>{user.name}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '125px' }}>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                label="Priority"
                autowidth="true"
                value={priority}
                onChange={event => {
                  handleChange(event);
                }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ marginRight: '8px' }}>CREATE</Button>
            <Button variant="outlined" onClick={handleClose}>CANCEL</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateModal;
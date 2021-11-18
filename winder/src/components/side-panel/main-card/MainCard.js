import './MainCard.css';
import { React, useState, useContext } from 'react';

import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { updateTask, deleteTask } from '../../../actions/tasks.js';

import store from '../../../store.js'
import { GlobalContext } from '../../../Contexts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MainCard = (props) => {
    const initialState = {
        title: props.title,
        description: props.description,
        assignee: props.assignee,
        assigneeName: props.assigneeName,
        priority: props.priority,
        status: props.status
    }

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialState);
    const [assignee, setAssignee] = useState(props.users.findIndex((e) => { return e.id == props.assignee }));
    const [priority, setPriority] = useState(props.priority);
    const [status, setStatus] = useState(props.status);

    const { contextValue } = useContext(GlobalContext);
    const { editable, setEditable } = useState(contextValue.userId == props.creator);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        store.dispatch(updateTask(props.taskId, form))
            .then((res) => {
                if (res) {
                    clear();
                    handleRefresh();
                    handleClose();
                }
            })
    }

    const handleChange = (e) => {
        if (e.target.name == 'assignee') {
            setAssignee(e.target.value);

            setForm({ ...form, ['assigneeName']: props.users[e.target.value]['name'], ['assignee']: props.users[e.target.value]['id'] });
        } else {
            if (e.target.name == 'priority') {
                setPriority(e.target.value);
            } else if (e.target.name == 'status') {
                setStatus(e.target.value);
            }
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    const handleRefresh = () => {
        props.refresh();
    }

    const handleDelete = () => {
        store.dispatch(deleteTask(props.taskId))
            .then((res) => {
                if (res) {
                    clear();
                    handleClose();
                }
            })
    }

    const clear = () => {
        setForm(initialState);
        setAssignee(props.users.findIndex((e) => { return e.id == props.assignee }));
        setPriority(props.priority);
        setStatus(props.status);
    }

    return (
        <div className="maincard__container">
            <Card onClick={handleOpen} className="maincard__card" sx={{ width: 1, boxSizing: 'border-box', cursor: 'pointer' }}>
                <Grid container>
                    <Grid item xs={4} sx={{ padding: '15px;' }}>
                        {props.title}
                    </Grid>
                    <Grid item xs={1} sx={{ padding: '15px;' }}>
                        {props.ticketNumber}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: '15px;' }}>
                        {props.assigneeName}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: '15px;' }}>
                        {props.date}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: '15px;' }}>
                        {props.status == 'BACKLOG' && (
                            <Box sx={{ borderRadius: '20px', textAlign: 'center', backgroundColor: '#F21B3F', color: '#fff', display: 'inline-block', padding: '4px 8px 4px 8px', fontSize: '10px' }}>{props.status}</Box>
                        )}
                        {props.status == 'OPEN' && (
                            <Box sx={{ borderRadius: '20px', textAlign: 'center', backgroundColor: '#08BDBD', color: '#fff', display: 'inline-block', padding: '4px 8px 4px 8px', fontSize: '10px' }}>{props.status}</Box>
                        )}
                        {props.status == 'COMPLETED' && (
                            <Box sx={{ borderRadius: '20px', textAlign: 'center', backgroundColor: '#29BF12', color: '#fff', display: 'inline-block', padding: '4px 8px 4px 8px', fontSize: '10px' }}>{props.status}</Box>
                        )}
                    </Grid>
                    <Grid item xs={1} sx={{ padding: '15px;' }}>
                        {props.priority == 'Low' && (
                            <Box sx={{ borderRadius: '50%', width: '19px', height: '19px', backgroundColor: '#29BF12' }}></Box>
                        )}
                        {props.priority == 'Medium' && (
                            <Box sx={{ borderRadius: '50%', width: '20px', height: '20px', backgroundColor: '#FF9914' }}></Box>
                        )}
                        {props.priority == 'High' && (
                            <Box sx={{ borderRadius: '50%', width: '20px', height: '20px', backgroundColor: '#F21B3F' }}></Box>
                        )}
                    </Grid>
                </Grid>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
                            Task #{props.ticketNumber} <br></br> Reporter: {props.creatorName}
                        </Typography>
                        <Button onClick={handleDelete} variant="outlined" color="error" sx={{ position: 'absolute', top: '7%', right: '7%' }}>
                            Delete
                        </Button>
                    </Box>
                    <TextField
                        id="title"
                        name="title"
                        disabled={props.status == 'COMPLETED'}
                        onChange={event => {
                            handleChange(event);
                        }}
                        value={form.title}
                        sx={{ width: 1, marginBottom: '16px' }}
                    />
                    <TextField
                        id="description"
                        name="description"
                        disabled={props.status == 'COMPLETED'}
                        multiline
                        rows={4}
                        value={form.description}
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
                                disabled={props.status == 'COMPLETED'}
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
                                disabled={props.status == 'COMPLETED'}
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
                        <FormControl variant="standard" sx={{ width: '125px' }}>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                name="status"
                                label="status"
                                autowidth="true"
                                value={status}
                                onChange={event => {
                                    handleChange(event);
                                }}
                            >
                                <MenuItem value="BACKLOG">Backlog</MenuItem>
                                <MenuItem value="OPEN">Open</MenuItem>
                                <MenuItem value="COMPLETED">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ marginRight: '8px' }}>UPDATE</Button>
                        <Button variant="outlined" onClick={handleClose}>CANCEL</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default MainCard

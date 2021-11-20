import * as React from 'react';
import './LoadingScreen.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CircularIndeterminate() {
    return (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%' }}>
                    <CircularProgress />
                </Box>
                <Box sx={{ width: '100%', marginLeft: '16px' }}>
                    <Typography> LOADING... </Typography>
                </Box>
            </Box>
        </Box>
    );
}
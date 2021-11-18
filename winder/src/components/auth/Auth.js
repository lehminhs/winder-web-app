import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from './google-icon/GoogleIcon';
import logo from './../../assets/logo.png';
import { signIn, signUp } from './../../actions/auth';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import store from '../../store';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                Winder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
const initialForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const AuthWrapper = () => {
    return (
        <Provider store={store}>
            <Auth />
        </Provider>
    )
}

const Auth = () => {
    const [form, setForm] = useState(initialForm);
    const [isSignUp, setIsSignUp] = useState(false);
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isSignUp) {
            store.dispatch(signIn(form, navigate));
        } else {
            store.dispatch(signUp(form));
        }
    };

    const signUpSwitch = () => {
        setForm(initialForm);

        setIsSignUp((oldIsSignUp) => !oldIsSignUp)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            store.dispatch({ type: "AUTH", data: { result, token } });
            store.dispatch(signUp({ 
                firstName: result.givenName, 
                lastName: result.familyName, 
                email: result.email,
                password: result.googleId, 
                confirmPassword: result.googleId,
                googleId: result.googleId
            }));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('failed google authentication :(')
    }

    useEffect(() => {
        store.dispatch({ type: 'LOGOUT' });
        navigate('/login');

        setForm(initialForm);
        setIsSignUp(false);
      }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        alt="Winder"
                        src={logo}
                        sx={{ width: 64, height: 64, mb: 2 }}
                    />
                    <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={event => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                            )}
                            {isSignUp && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={event => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={event => {
                                        handleChange(event);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                    onChange={event => {
                                        handleChange(event);
                                    }}
                                />
                            </Grid>
                            {isSignUp && (
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="confirm-password"
                                        onChange={event => {
                                            handleChange(event);
                                        }}
                                    />
                                </Grid>
                            )}
                            {/* <Grid item xs={12}>
                                {isSignUp && (
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        onChange={event => {
                                            handleChange(event);
                                        }}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                )}
                                {!isSignUp && (
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        onChange={event => {
                                            handleChange(event);
                                        }}
                                        label="Remember me"
                                    />
                                )}
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isSignUp ? "Register" : "Sign In"}
                        </Button>
                        {!isSignUp && (
                            <GoogleLogin
                                clientId="917403337929-3tn3n5vc8arv6rmlqpcsn8tv19jc3qa0.apps.googleusercontent.com"
                                render={(renderProps) =>
                                    <Button
                                        className="googleButton"
                                        color="primary"
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        startIcon={<GoogleIcon />}
                                        variant="contained">
                                        Google Sign In
                                    </Button>
                                }
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                        )}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={signUpSwitch}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default AuthWrapper;

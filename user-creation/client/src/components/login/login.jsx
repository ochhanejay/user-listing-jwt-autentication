import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { postApiRequest } from '../../api';
import { authContext } from '../../context/context';
// import { authContext } from '../contexts/cknContext';

const theme = createTheme();

export default function LoginUser() {
    const { navbarShow, setNavbarShow, setUserDetails } = React.useContext(authContext);
    // const {URL,auth, setAuth,token, setToken} = React.useContext(authContext);
    const [userSign, setUserSign] = React.useState({
        email: "", password: ""
    });
    const history = useNavigate();
    const handleSave = (event) => {
        const { name, value } = event.target;

        let customerData = { ...userSign };
        customerData[name] = value;
        setUserSign(customerData);

    };
    // React.useEffect(() => {
    //   setInterval(()=>{
    //     window. location. reload(false);
    //     alert("545454");
    //   },600000);

    //     }, [0]);

    React.useEffect(() => {
        if (localStorage.getItem("tokens")) {
            history("/table");
        }
    }, [0])

    const signIn = async (e) => {
        const user = {
            email: userSign.email,
            password: userSign.password
        }
        try {
            await postApiRequest(`/logIn`, user).then((resp) => {
                // setToken(resp.data.accessToken);
                console.log(resp, "111");
                localStorage.setItem("tokens", resp?.accessToken?.toString());
                localStorage.setItem("time", "1d");
                localStorage.setItem("navShow", "true");
                setNavbarShow(!navbarShow);
                // window.location("/showImages")
                history("/table");
            }).catch(err => {
                if (err.response.data === "Unauthorized") {
                    alert("Invalid Credentials");
                }


            });
        } catch (error) {

        }


    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mode: 'dark'
                    }}
                >
                    <Avatar className='glow-button' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon className='fs-2' />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            color="secondary"

                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => handleSave(e)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            color="secondary"

                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => handleSave(e)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="secondary"
                            />}
                            label="Remember me"
                        />
                        <Button
                            type="button"
                            color="secondary"
                            variant="contained"
                            fullWidth
                            className='glow-button'
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => signIn(e)}
                        >
                            Log In
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/signUp" style={{ textDecoration: "none", color: "black" }} variant="body2">
                                    <button onClick={() => setUserDetails([])} className='btn'>  Don't have an account? Sign up</button>

                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
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
import { postApiRequest, putApiRequest } from '../../api';
import { authContext } from '../../context/context';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const { userDetails, setUserDetails } = React.useContext(authContext);
    React.useEffect(() => {
        console.log(userDetails)
    })
    const history = useNavigate();
    const [userSignUp, setUserSignUp] = React.useState({
        email: "", password: "", firstName: "", lastName: ""
    });
    const handleSave = (event) => {
        const { name, value } = event.target;

        let customerData = { ...userSignUp };
        customerData[name] = value;
        setUserSignUp(customerData);

    };
    const signUp = async (e) => {
        const user = {
            email: userSignUp.email ? userSignUp.email : userDetails.email,
            firstName: userSignUp.firstName ? userSignUp.firstName : userDetails.firstName,
            lastName: userSignUp.lastName ? userSignUp.lastName : userDetails.lastName
        }
        try {
            if (userDetails?.length > 0 || userDetails?.length === undefined) {
                await putApiRequest(`/updateUser?id=${userDetails._id}`, user).then((resp) => {

                    history("/table");
                }).catch(err => {
                    console.log(err);


                });
            }
            else {
                await postApiRequest(`/signUp`, userSignUp).then((resp) => {

                    history("/");
                }).catch(err => {
                    console.log(err);


                });
            }

        } catch (error) {

        }


    }

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon className='fs-2' />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {userDetails?.length > 0 || userDetails?.length === undefined ? "Update User" : "Sign Up"}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    shrink={true}
                                    defaultValue={userDetails?.firstName}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={(e) => handleSave(e)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    shrink={true}
                                    defaultValue={userDetails?.lastName}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => handleSave(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    shrink={true}
                                    defaultValue={userDetails?.email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => handleSave(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    disabled={userDetails?.length > 0 || userDetails?.length === undefined ? true : false}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => handleSave(e)}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            className='glow-button w-75'
                            variant="contained"
                            sx={{ mt: 4, mb: 2 }}
                            onClick={(e) => signUp(e)}
                        >
                            {userDetails?.length > 0 || userDetails?.length === undefined ? "Update User" : "Sign Up"}
                        </Button>
                        <Grid hidden={userDetails?.length > 0 || userDetails?.length === undefined ? true : false} container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/" variant="body2">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
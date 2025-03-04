import {useState} from "react";
import axiosClient from "../../../axios_client.js";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";
import {Box, Button,Paper, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import LoginIcon from '@mui/icons-material/Login';
import {useTranslation} from 'react-i18next';
import {resetErrorData, setErrorData} from "../../../helpers/ErrorData.js";
import * as React from "react";
import Copyright from "../../../components/Copyright.jsx";

export default function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [formErrors, setFormErrors] = useState({
        email: {errorstatus: false, helperText: ''},
        password: {errorstatus: false, helperText: ''},
    });

    const {t} = useTranslation();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        resetErrorData(formErrors, setFormErrors);

        axiosClient.post('/login', credentials)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrorData(response.data.errors, formErrors, setFormErrors)
                    }
                }
            })
    }

    return (

        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(images/backdrop2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{justifyContent: 'center'}}>
                <Box
                    sx={{
                        pt: 10,
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div className="login-center">
                        <form onSubmit={onSubmit}>
                            <div>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 120,
                                        width: 400,
                                        marginBottom: 10
                                    }}
                                    alt="Agriviewer Logo"
                                    src="/images/logo2.png"
                                />
                                <h1>{t('login.title')}</h1>
                                <br/>
                            </div>
                            <TextField fullWidth
                                       value={credentials.email}
                                       onChange={ev => setCredentials({...credentials, email: ev.target.value})}
                                       label={t('login.email_field')} variant="outlined" margin="dense"
                                       error={formErrors.email.errorstatus}
                                       helperText={formErrors.email.helperText} />
                            <TextField fullWidth
                                       value={credentials.password}
                                       onChange={ev => setCredentials({...credentials, password: ev.target.value})}
                                       label={t('login.password_field')} type="password"
                                       variant="outlined" margin="dense"
                                       error={formErrors.password.errorstatus}
                                       helperText={formErrors.password.helperText} />
                            <br/>&nbsp;<br/>
                            <Button type="submit" fullWidth variant="outlined" size="large"
                                    startIcon={<LoginIcon/>}>
                                {t('login.submit_button')}
                            </Button>
                            <Copyright />

                        </form>
                    </div>

                </Box>
            </Grid>
        </Grid>
    )

}

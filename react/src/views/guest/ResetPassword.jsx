import {useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import axiosClient from "../../axios_client.js";
import Grid from "@mui/material/Grid2";
import {Box, Button, Paper, TextField} from "@mui/material";
import * as React from "react";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import KeyIcon from '@mui/icons-material/Key';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {t} = useTranslation();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axiosClient.post("/reset-password", {
                email,
                token,
                password,
                password_confirmation: confirmPassword,
            });
            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (error) {
            setMessage(t("reset_password.error_occured"));
        }
    };

    return (

        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                size={{xs: 0, sm: 4, md: 7}}
                sx={{
                    backgroundImage: 'url(images/backdrop.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid size={{xs: 12, sm: 8, md: 5}} component={Paper} elevation={8} square sx={{justifyContent: 'center'}}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div className="login-center">
                        <form onSubmit={handleSubmit}>

                            <Box
                                component="img"
                                sx={{
                                    mx: 10,
                                    height: 300,
                                    width: 300,
                                    marginBottom: 10
                                }}
                                alt="UMDL Logo"
                                src="/images/logo.png"
                            />
                            <Typography component="h2" variant="h2" sx={{mb: 2}}>
                                {t("reset_password.title")}
                            </Typography>
                            <Box sx={{width: 500}}>
                                <Typography component="body2" variant="body2" sx={{width: '250px'}}>
                                    {t("reset_password.explanation")}
                                </Typography>
                            </Box>
                            <br/>
                            <TextField fullWidth
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       label={t('reset_password.password')}
                                       variant="outlined" margin="dense" type="password" required={true}
                                       sx={{mt: 4}}
                            />
                            <TextField fullWidth
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       label={t('reset_password.password_confirmation')}
                                       variant="outlined" margin="dense" type="password" required={true}
                            />
                            <br/>&nbsp;<br/>
                            <Button sx={{mb: 4}} type="submit" fullWidth variant="contained" color="secondary"
                                    size="large"
                                    startIcon={<KeyIcon/>}>
                                {t('reset_password.submit_button')}
                            </Button>
                            {message && <Box sx={{width: 500}}>
                                <Typography component="body2" variant="body2" sx={{width: '250px'}}>
                                    {message}
                                </Typography>
                            </Box>}
                        </form>
                    </div>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;

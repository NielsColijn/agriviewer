import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import LayersIcon from '@mui/icons-material/Layers';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BBMCodeForm from "../../components/forms/BBMCodeForm.jsx";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
export default function Admin_BBMCodeSettings() {

    const [bbmcodes, setBbmcodes] = useState({});
    const [loading, setLoading] = useState(false);
    const [addNew, setAddNew] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getBbmcodes();
    }, [])

    const getBbmcodes = () => {
        setLoading(true);
        axiosClient.get(`/bbm/getcodes`)
            .then(({data}) => {
                setLoading(false);
                setBbmcodes(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const toggleNewMode = () => {
        setAddNew(!addNew);
    };

    const updateParent = () => {
        getBbmcodes();
    };

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2}
                   sx={{
                       display: { xs: 'none', md: 'flex' },
                       width: '100%',
                       alignItems: { xs: 'flex-start', md: 'center' },
                       justifyContent: 'space-between',
                       maxWidth: { sm: '100%', md: '1700px' },
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <SettingsRoundedIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_admin.code_settings")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={toggleNewMode}>
                        {t("general.add")}
                    </Button>
                </Stack>
            </Stack>
            {loading && <CenteredLoading />}
            {!loading && !isObjectEmpty(bbmcodes) &&
                <Box>
                    {addNew && <BBMCodeForm key="new" onAddorDelete={updateParent}  onCancelNew={toggleNewMode} />}
                    {bbmcodes.map((b, index) => {
                        return (
                            <BBMCodeForm key={index} bbmcode={b} index={index} onAddorDelete={updateParent} />
                        )
                    })
                    }
                </Box>
            }
        </Box>
    )

}

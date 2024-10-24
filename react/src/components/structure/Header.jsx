import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from '../forms/CustomDatePicker.jsx';
import NavbarBreadcrumbs from './NavbarBreadcrumbs.jsx';
import MenuButton from '../visuals/MenuButton.jsx';
import ColorModeIconDropdown from '../../theme/ColorModeIconDropdown.jsx';

import Search from './Search.jsx';
import AboutScreen from "../visuals/AboutScreen.jsx";

export default function Header() {
    return (
        <Stack
            direction="row"
            sx={{
                display: {xs: 'none', md: 'flex'},
                width: '100%',
                alignItems: {xs: 'flex-start', md: 'center'},
                justifyContent: 'space-between',
                maxWidth: {sm: '100%', md: '1700px'},
                pt: 1.5,
            }}
            spacing={2}
        >
            <div></div>
            <Stack direction="row" sx={{gap: 1}}>
                <ColorModeIconDropdown/>
                <AboutScreen/>
            </Stack>
        </Stack>
    );
}

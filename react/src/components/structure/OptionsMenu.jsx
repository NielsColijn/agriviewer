import * as React from 'react';
import {styled} from '@mui/material/styles';
import Divider, {dividerClasses} from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import {paperClasses} from '@mui/material/Paper';
import {listClasses} from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, {listItemIconClasses} from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from '../visuals/MenuButton.jsx';
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios_client.js";

const MenuItem = styled(MuiMenuItem)({
    margin: '2px 0',
});

export default function OptionsMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {user, token, setUser, setToken, notification} = useStateContext();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }
    return (
        <React.Fragment>
            <MenuButton
                aria-label="Open menu"
                onClick={handleClick}
                sx={{borderColor: 'transparent'}}
            >
                <MoreVertRoundedIcon/>
            </MenuButton>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                sx={{
                    [`& .${listClasses.root}`]: {
                        padding: '4px',
                    },
                    [`& .${paperClasses.root}`]: {
                        padding: 0,
                    },
                    [`& .${dividerClasses.root}`]: {
                        margin: '4px -4px',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <Divider/>
                <MenuItem
                    onClick={onLogout}
                    sx={{
                        [`& .${listItemIconClasses.root}`]: {
                            ml: 'auto',
                            minWidth: 0,
                        },
                    }}
                >
                    <ListItemText>Logout</ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
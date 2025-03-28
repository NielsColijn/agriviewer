import * as React from 'react';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DatasetIcon from '@mui/icons-material/Dataset';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import ReportIcon from "@mui/icons-material/Report";

export default function AdminMenuContent() {

    const {t} = useTranslation();

    const mainItems = [
        {text: t("admin_menu.dashboard"), icon: <HomeRoundedIcon/>, link: '/admin/dashboard'},
        {text: t("admin_menu.overview_total"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/totaal'},
        {text: t("admin_menu.overview_collective"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/collectief'},
        {text: t("admin_menu.overview_individual"), icon: <AnalyticsIcon/>, link: '/admin/overzicht/individueel'},
        {text: t("admin_menu.confrontation_matrix"), icon: <ReportIcon/>, link: '/admin/matrix'},
    ];

    const data = [
        {text: t("admin_menu.klw_import"), icon: <ImportExportIcon/>, link: '/admin/klw/importeren'},
        {text: t("admin_menu.klw_data_management"), icon: <DatasetIcon/>, link: '/admin/klw/data'},
        {text: t("admin_menu.gis_import"), icon: <ImportExportIcon/>, link: '/admin/gis/importeren'},
        {text: t("admin_menu.gis_data_management"), icon: <DatasetIcon/>, link: '/admin/gis/data'},
        {text: t("admin_menu.raw_data"), icon: <DatasetIcon/>, link: '/admin/rawdata'},
    ];


    const settingItems = [
        {text: t("admin_menu.general_settings"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/general'},
        {text: t("admin_menu.bbm_codes"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/bbmcodes'},
        {text: t("admin_menu.bbm_kpis"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/bbmkpis'},
        {text: t("admin_menu.scangis_packages"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/scangis'},
        {text: t("admin_menu.anlb_packages"), icon: <SettingsRoundedIcon/>, link: '/admin/settings/anlb'},
        {text: t("admin_menu.logs"), icon: <AssignmentIcon/>, link: '/admin/logs'},
    ];

    const userItems = [
        {text: t("admin_menu.user_management"), icon: <PersonIcon/>, link: '/admin/users/'},
    ];
    return (

        <Stack sx={{flexGrow: 1, p: 4,}}>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {t("admin_menu.overviews")}
            </Typography>
            <List dense>
                {mainItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("admin_menu.data")}
            </Typography>
            <List dense>
                {data.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("admin_menu.settings")}
            </Typography>
            <List dense>
                {settingItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600, mt: 1}}>
                {t("admin_menu.users")}
            </Typography>
            <List dense>
                {userItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}

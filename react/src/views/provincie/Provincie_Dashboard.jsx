import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ActionOverview from "../../components/visuals/ActionOverview.jsx";
import {useTranslation} from "react-i18next";
import BeheerderGauges from "../../components/data/BeheerderGauges.jsx";
import KLWOverviewBeheerder from "../../components/data/KLWOverviewBeheerder.jsx";

export default function Provincie_Dashboard() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px', lg: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_provincie.dashboard")}
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                alignItems="stretch" // Ensures both left and right sections match height
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {/* Left Column */}
                <Grid
                    container
                    item
                    xs={12} sm={12} lg={12}
                    sx={{ display: "flex", flexDirection: "column" }} // Keeps items stacked but aligned properly
                >
                    {/* Row of CompletionGauges */}
                    <BeheerderGauges />

                    {/* KLWOverviewBeheerder should stay at the top */}

                </Grid>
            </Grid>
        </Box>
    )

}

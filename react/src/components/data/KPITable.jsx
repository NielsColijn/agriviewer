import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import Grid from "@mui/material/Grid2";
import ScoreGauge from "../visuals/ScoreGauge.jsx";
import {showYearMonths} from "../../helpers/YearMonths.js";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

export default function KPITable(props) {
    const [kpi, setKPI] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getKPI();
    }, [props.company, props.renderTable])

    const getKPI = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/umdlkpi/getscores/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    setKPI(data);
                    setTableData(makeTable(data));
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }
    const makeTable = (data) => [
        {
            text_1: t("kpis.1a"),
            text_2: t("kpis.1b"),
            color_1: 'grey',
            color_2: 'black',
            type: 'double',
            year1_1: data.year1.kpi1a,
            year2_1: data.year2.kpi1a,
            year3_1: data.year3.kpi1a,
            year1_2: data.year1.kpi1b,
            year2_2: data.year2.kpi1b,
            year3_2: data.year3.kpi1b,
            avg_1: data.avg.kpi1a,
            avg_col_1: data.avg_col.kpi1a,
            avg_tot_1: data.avg_tot.kpi1a,
            avg_2: data.avg.kpi1b,
            avg_col_2: data.avg_col.kpi1b,
            avg_tot_2: data.avg_tot.kpi1b,
            score: data.score.kpi1b,
            score_col: data.score_col.kpi1b,
            score_tot: data.score_tot.kpi1b,
        },
        {
            text: t("kpis.2"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi2,
            year2: data.year2.kpi2,
            year3: data.year3.kpi2,
            avg: data.avg.kpi2,
            avg_col: data.avg_col.kpi2,
            avg_tot: data.avg_tot.kpi2,
            score: data.score.kpi2,
            score_col: data.score_col.kpi2,
            score_tot: data.score_tot.kpi2,
        },
        {
            text: t("kpis.3"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi3,
            year2: data.year2.kpi3,
            year3: data.year3.kpi3,
            avg: data.avg.kpi3,
            avg_col: data.avg_col.kpi3,
            avg_tot: data.avg_tot.kpi3,
            score: data.score.kpi3,
            score_col: data.score_col.kpi3,
            score_tot: data.score_tot.kpi3,
        },
        {
            text: t("kpis.4"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi4,
            year2: data.year2.kpi4,
            year3: data.year3.kpi4,
            avg: data.avg.kpi4,
            avg_col: data.avg_col.kpi4,
            avg_tot: data.avg_tot.kpi4,
            score: data.score.kpi4,
            score_col: data.score_col.kpi4,
            score_tot: data.score_tot.kpi4,
        },
        {
            text: t("kpis.5"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi5,
            year2: data.year2.kpi5,
            year3: data.year3.kpi5,
            avg: data.avg.kpi5,
            avg_col: data.avg_col.kpi5,
            avg_tot: data.avg_tot.kpi5,
            score: data.score.kpi5,
            score_col: data.score_col.kpi5,
            score_tot: data.score_tot.kpi5,
        },
        {
            text_1: t("kpis.6a"),
            text_2: t("kpis.6b"),
            text_3: t("kpis.6c"),
            text_4: t("kpis.6d"),
            color_1: 'grey',
            color_2: 'black',
            color_3: 'grey',
            color_4: 'grey',
            type: 'quad',
            year1_1: data.year1.kpi6a,
            year2_1: data.year2.kpi6a,
            year3_1: data.year3.kpi6a,
            year1_2: data.year1.kpi6b,
            year2_2: data.year2.kpi6b,
            year3_2: data.year3.kpi6b,
            year1_3: data.year1.kpi6c,
            year2_3: data.year2.kpi6c,
            year3_3: data.year3.kpi6c,
            year1_4: data.year1.kpi6d,
            year2_4: data.year2.kpi6d,
            year3_4: data.year3.kpi6d,
            avg_1: data.avg.kpi6a,
            avg_col_1: data.avg_col.kpi6a,
            avg_tot_1: data.avg_tot.kpi6a,
            avg_2: data.avg.kpi6b,
            avg_col_2: data.avg_col.kpi6b,
            avg_tot_2: data.avg_tot.kpi6b,
            avg_3: data.avg.kpi6c,
            avg_col_3: data.avg_col.kpi6c,
            avg_tot_3: data.avg_tot.kpi6c,
            avg_4: data.avg.kpi6d,
            avg_col_4: data.avg_col.kpi6d,
            avg_tot_4: data.avg_tot.kpi6d,
            score: data.score.kpi6b,
            score_col: data.score_col.kpi6b,
            score_tot: data.score_tot.kpi6b,
        },
        {
            text: t("kpis.7"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi7,
            year2: data.year2.kpi7,
            year3: data.year3.kpi7,
            avg: data.avg.kpi7,
            avg_col: data.avg_col.kpi7,
            avg_tot: data.avg_tot.kpi7,
            score: data.score.kpi7,
            score_col: data.score_col.kpi7,
            score_tot: data.score_tot.kpi7,
        },
        {
            text: t("kpis.8"),
            color: 'black',
            type: '4-wide',
            year1: data.year1.kpi8,
            year2: data.year2.kpi8,
            year3: data.year3.kpi8,
            avg: data.avg.kpi8,
            avg_col: data.avg_col.kpi8,
            avg_tot: data.avg_tot.kpi8,
            score: data.score.kpi8,
            score_col: data.score_col.kpi8,
            score_tot: data.score_tot.kpi8,
        },
        {
            text: t("kpis.9"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi9,
            year2: data.year2.kpi9,
            year3: data.year3.kpi9,
            avg: data.avg.kpi9,
            avg_col: data.avg_col.kpi9,
            avg_tot: data.avg_tot.kpi9,
            score: data.score.kpi9,
            score_col: data.score_col.kpi9,
            score_tot: data.score_tot.kpi9,
        },
        {
            text: t("kpis.10"),
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi10 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi10 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi10 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi10 * 100).toFixed(1) + "%",
            avg_col: parseFloat(data.avg_col.kpi10 * 100).toFixed(1) + "%",
            avg_tot: parseFloat(data.avg_tot.kpi10 * 100).toFixed(1) + "%",
            score: data.score.kpi10,
            score_col: data.score_col.kpi10,
            score_tot: data.score_tot.kpi10,
        },
        {
            text: t("kpis.11"),
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi11 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi11 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi11 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi11 * 100).toFixed(1) + "%",
            avg_col: parseFloat(data.avg_col.kpi11 * 100).toFixed(1) + "%",
            avg_tot: parseFloat(data.avg_tot.kpi11 * 100).toFixed(1) + "%",
            score: data.score.kpi11,
            score_col: data.score_col.kpi11,
            score_tot: data.score_tot.kpi11,
        },
        {
            text: t("kpis.12"),
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi12 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi12 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi12 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi12 * 100).toFixed(1) + "%",
            avg_col: parseFloat(data.avg_col.kpi12 * 100).toFixed(1) + "%",
            avg_tot: parseFloat(data.avg_tot.kpi12 * 100).toFixed(1) + "%",
            score: data.score.kpi12,
            score_col: data.score_col.kpi12,
            score_tot: data.score_tot.kpi12,
        },
        {
            text_1: t("kpis.13a"),
            text_2: t("kpis.13b"),
            type: 'double',
            color_1: 'black',
            color_2: 'black',
            year1_1: parseFloat(data.year1.kpi13a * 100).toFixed(1) + "%",
            year2_1: parseFloat(data.year2.kpi13a * 100).toFixed(1) + "%",
            year3_1: parseFloat(data.year3.kpi13a * 100).toFixed(1) + "%",
            year1_2: data.year1.kpi13b,
            year2_2: data.year2.kpi13b,
            year3_2: data.year3.kpi13b,
            avg_1: parseFloat(data.avg.kpi13a * 100).toFixed(1) + "%",
            avg_col_1: parseFloat(data.avg_col.kpi13a * 100).toFixed(1) + "%",
            avg_tot_1: parseFloat(data.avg_tot.kpi13a * 100).toFixed(1) + "%",
            avg_2: data.avg.kpi13b,
            avg_col_2: data.avg_col.kpi13b,
            avg_tot_2: data.avg_tot.kpi13b,
            score: Math.max(data.score.kpi13a, data.score.kpi13b),
            score_col: data.score_col.kpi13,
            score_tot: data.score_tot.kpi13,
        },
        {
            text: t("kpis.14"),
            color: 'black',
            type: 'normal',
            year1: showYearMonths(data.year1.kpi14),
            year2: showYearMonths(data.year2.kpi14),
            year3: showYearMonths(data.year3.kpi14),
            avg: showYearMonths(data.avg.kpi14),
            avg_col: showYearMonths(data.avg_col.kpi14),
            avg_tot: showYearMonths(data.avg_tot.kpi14),
            score: data.score.kpi14,
            score_col: data.score_col.kpi14,
            score_tot: data.score_tot.kpi14,
        },
        {
            text: t("kpis.15"),
            color: 'black',
            type: '4-wide',
            year1: data.year1.kpi15,
            year2: data.year2.kpi15,
            year3: data.year3.kpi15,
            avg: data.avg.kpi15,
            avg_col: "-",
            avg_tot: "-",
            score: data.score.kpi15,
            score_col: data.score_col.kpi15,
            score_tot: data.score_tot.kpi15,
        },
    ];

    return (
        <Grid container spacing={2} size={{xs: 12, lg: 12}}>
            <Grid size={{xs: 12, lg: 6}} key="kpi-grid-1">
                <Card variant="outlined" key="card-1">
                    <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                        <ScoreboardIcon/>
                        <Typography component="h6" variant="h6">
                            {t("kpi_table.total_score_points")}
                        </Typography>
                    </Stack>
                    {loading && <CenteredLoading />}
                    {!loading && !isObjectEmpty(kpi)  &&
                        <ScoreGauge score={kpi.total.score} text={kpi.total.score} maxScore={2900} cat3={2399}
                                    cat2={1899} cat1={1399}
                                    score_col={kpi.total_col.score}
                                    score_tot={kpi.total_tot.score}/>}
                </Card>
            </Grid>
            <Grid size={{xs: 12, lg: 6}} key="kpi-grid-2">
                <Card variant="outlined" key="card-2">
                    <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                        <EuroOutlinedIcon/>
                        <Typography component="h6" variant="h6">
                            {t("kpi_table.total_score_money")}
                        </Typography>
                    </Stack>
                    {loading && <CenteredLoading />}
                    {!loading && !isObjectEmpty(kpi) &&
                        <ScoreGauge score={kpi.total.money} text={kpi.total.money} maxScore={5000}
                                    cat3={3899} cat2={2399} cat1={1399}
                                    score_col={kpi.total_col.money}
                                    score_tot={kpi.total_tot.money}/>}

                </Card>
            </Grid>
            <Grid size={{xs: 12, lg: 12}} key="kpi-grid-3">
                <Card variant="outlined" key="card-3">
                    <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                        <TimelineOutlinedIcon/>
                        <Typography component="h6" variant="h6">
                            {t("kpi_table.kpis")}
                        </Typography>
                    </Stack>
                    <TableContainer sx={{minHeight: 100,}}>
                        {loading && <CenteredLoading />}
                        {!loading && !isObjectEmpty(kpi) &&
                            <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow key={997}>
                                        <TableCell sx={{width: 250}}> </TableCell>
                                        <TableCell sx={{width: 60, border: 1}}
                                                   align="center">{kpi.year1.year}</TableCell>

                                        <TableCell sx={{width: 60, border: 1}}
                                                   align="center">{kpi.year2.year}</TableCell>
                                        <TableCell sx={{width: 60, border: 1}}
                                                   align="center">{kpi.year3.year}</TableCell>
                                        <TableCell sx={{width: 60, border: 1}} align="center">{t("kpi_table.average")}</TableCell>
                                        <TableCell sx={{width: 60, border: 1}} align="center">{t("kpi_table.comparison")}</TableCell>
                                        <TableCell sx={{width: 60, border: 1}} align="center">{t("kpi_table.points")}</TableCell>
                                        <TableCell sx={{width: 60, border: 1}} align="center">{t("kpi_table.comparison")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((tab, index) => {
                                            if (tab.type === "normal") {
                                                return (
                                                    <TableRow key={index} sx={{margin: 0, color: tab.color}}>
                                                        <TableCell component="th" scope="row">
                                                            {tab.text}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {tab.year1}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {tab.year2}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {tab.year3}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                            {tab.avg}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t("kpi_table.collective_letter")}: {tab.avg_col}<br />
                                                            {t("kpi_table.total_letter")}: {tab.avg_tot}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                            {tab.score}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t("kpi_table.collective_letter")}: {tab.score_col}<br />
                                                            {t("kpi_table.total_letter")}: {tab.score_tot}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                            if (tab.type === "double") {
                                                return (<>
                                                        <TableRow key={index + "01"}  sx={{margin: 0, color: tab.color_1}}>
                                                            <TableCell component="th" scope="row" sx={{color: tab.color_1}}>
                                                                {tab.text_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {tab.year1_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {tab.year2_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {tab.year3_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold', color: tab.color_1}} align="center">
                                                                {tab.avg_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col_1}<br />
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={2}
                                                                       align="center">
                                                                {tab.score}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} rowSpan={2}
                                                            align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.score_col}<br />
                                                                {t("kpi_table.total_letter")}: {tab.score_tot}
                                                        </TableCell>
                                                        </TableRow>
                                                        <TableRow sx={{margin: 0, color: tab.color_2}} key={index + "02"}>
                                                            <TableCell component="th" scope="row">
                                                                {tab.text_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color}} align="center">
                                                                {tab.year1_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year2_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year3_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.avg_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col_2}<br />
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot_2}
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            }
                                            if (tab.type === "quad") {
                                                return (<>
                                                        <TableRow key={(index * 100) + 1}  sx={{margin: 0}}>
                                                            <TableCell sx={{color: tab.color_1}} component="th" scope="row">
                                                                {tab.text_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {tab.year1_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {tab.year2_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {tab.year3_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1, fontWeight: 'bold'}} align="center">
                                                                {tab.avg_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col_1}<br />
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={4}
                                                                       align="center">
                                                                {tab.score}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} rowSpan={4}
                                                                       align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.score_col}<br />
                                                                {t("kpi_table.total_letter")}: {tab.score_tot}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={(index * 100) + 2}  sx={{margin: 0}}>
                                                            <TableCell component="th" scope="row">
                                                                {tab.text_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year1_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year2_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year3_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.avg_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col_2}<br />
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot_2}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={(index * 100) + 3}  sx={{margin: 0}} >
                                                            <TableCell component="th" scope="row" sx={{color: tab.color_3}}>
                                                                {tab.text_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                {tab.year1_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                {tab.year2_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                {tab.year3_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_3, fontWeight: 'bold'}} align="center">
                                                                {tab.avg_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col_3}<br />
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot_3}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={(index * 100) + 4}  sx={{margin: 0}} >
                                                            <TableCell component="th" scope="row" sx={{color: tab.color_4}}>
                                                                {tab.text_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                {tab.year1_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                {tab.year2_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                {tab.year3_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_4, fontWeight: 'bold'}} align="center">
                                                                {tab.avg_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col_4}<br />
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot_4}
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            }
                                            if (tab.type === "4-wide") {
                                                return (
                                                    <TableRow key={index}  sx={{margin: 0}} >
                                                        <TableCell component="th" scope="row">
                                                            {tab.text}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} colSpan={4} align="center">
                                                            {tab.avg}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t("kpi_table.collective_letter")}: {tab.avg_col}<br />
                                                            {t("kpi_table.total_letter")}: {tab.avg_tot}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                            {tab.score}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t("kpi_table.collective_letter")}: {tab.score_col}<br />
                                                            {t("kpi_table.total_letter")}: {tab.score_tot}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        }
                                    )
                                    }
                                    <TableRow sx={{margin: 0}} key={998}>
                                        <TableCell colSpan={5} align="right">
                                            {t("kpi_table.total_score")}:
                                        </TableCell>
                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                            {kpi.total.score}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{margin: 0}} key={999}>
                                        <TableCell colSpan={5} align="right">
                                            {t("kpi_table.payout_money")}:
                                        </TableCell>
                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                            &euro;{kpi.total.money},-
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        }
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>
    )
        ;
}

import React from 'react';
import Plot from 'react-plotly.js';
import {useTranslation} from "react-i18next";

const HorizontalBoxPlotSingle = ({ data}) => {

    const {t} = useTranslation();

    return (
        <Plot
            data={[
                {
                    x: Object.values(data),
                    name: t("general.avg"),
                    type: 'box',
                    boxpoints: 'all',
                    jitter: 0.8,
                    pointpos: 2,
                    orientation: 'h',
                },
            ]}
            layout={{
                autosize: true,
                width: 500,
                height: 400,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
            }}
        />
    );
};

export default HorizontalBoxPlotSingle;

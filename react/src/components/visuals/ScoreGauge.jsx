import * as React from "react";
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    gaugeClasses,
} from "@mui/x-charts/Gauge";
import {Gauge} from "@mui/x-charts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect} from "react";

function GaugePointer() {
    const {valueAngle, outerRadius, cx, cy} = useGaugeState();

    if (valueAngle === null) {
        // No value to display
        return null;
    }

    const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle)
    };
    return (
        <g>
            <circle cx={cx} cy={cy} r={5} fill="black   "/>
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke="black"
                strokeWidth={4}
            />
        </g>
    );
}

export default function ScoreGauge(props) {
    const [value, setValue] = React.useState(50);

    useEffect(() => {
        setValue(props.score);
    }, [props.score])

    return (
        <Stack direction="row" gap={3}>
            <Box sx={{mt: 2, ml: 5}}>
                <Typography  component="h1" variant="h1">
                    {props.text}
                </Typography>
                <Typography sx={{mt: 2}} component="h1" variant="body2">
                   Gem. collectief:
                </Typography>
                <Typography  component="h1" variant="body2">
                    Gem. totaal:
                </Typography>
            </Box>
            <Gauge
                value={props.score}
                startAngle={-90}
                endAngle={90}
                text={() => ""}
                valueMin={0}
                valueMax={props.maxScore}
                sx={() => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        //fontSize: asNumber(atrFontSize).$or(() => undefined) ?? 12,
                        //transform: `translate(0px, ${atrRepositionValue ?? "0"}%)`
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        // Set conditional fill color based on arc location.
                        fill: value > props.cat3 ? "#385723" : value > props.cat2  ? "#548235" : value > props.cat1  ? "#a9d18e" : "#e2f0d9",
                    }
                })}
                height={150}
                width={300}
            >
                <GaugeReferenceArc/>
                <GaugePointer/>
            </Gauge>
        </Stack>
    );
}
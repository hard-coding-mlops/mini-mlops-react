import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor='middle' fill={'#4A4A4A'} fontWeight='bold' fontSize='1.2rem'>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={'#4A4A4A'}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={'#4A4A4A'}
            />
        </g>
    );
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill='black'
            fontWeight='500'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${value}명`}
        </text>
    );
};

export default function PieChartComponent({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <PieChart width={300} height={270}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                // data={dummyData}
                data={data}
                cx={145}
                cy={135}
                innerRadius={60}
                outerRadius={100}
                fill='#7A7A7A'
                dataKey='value'
                onMouseEnter={onPieEnter}
                label={renderCustomizedLabel}
                // label={{ position: 'outside' }}
                labelLine={false}
                // paddingAngle={1}
                startAngle={90}
                endAngle={-270}
            />
        </PieChart>
    );
}

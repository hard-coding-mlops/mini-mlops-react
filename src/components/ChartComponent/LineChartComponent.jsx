import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartComponent({ width, height, data }) {
    const tooltipFormatter = (value, name, props) => {
        return [`${name}: ${value}%`];
    };

    return (
        <LineChart width={width} height={height} data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='model_name' />
            <YAxis />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line type='monotone' dataKey='accuracy' stroke='#4285F4' dot={{ r: 5 }} />
            <Line type='monotone' dataKey='loss' stroke='#DB4437' dot={{ r: 5 }} />
        </LineChart>
    );
}

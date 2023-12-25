import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartComponent({ width, height, data }) {
    const tooltipFormatter = (value, name, props) => {
        const unit = props.name === 'accuracy' ? '%' : '';
        return [`${name} ${value}${unit}`];
        // : ${value}${yAxisId}
    };

    return (
        <LineChart width={width} height={height} data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='model_name' />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line yAxisId='left' type='monotone' dataKey='accuracy' stroke='#4285F4' dot={{ r: 5 }} />
            <Line yAxisId='right' type='monotone' dataKey='loss' stroke='#DB4437' dot={{ r: 5 }} />
        </LineChart>
    );
}

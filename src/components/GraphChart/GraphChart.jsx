import { Chart } from 'react-google-charts';

export const data = [
    ['City', 'accuracy', 'loss'],
    ['model_name_1', 82.193, 32.514],
    ['model_name_5', 81.015, 34.135],
    ['model_name_3', 80.856, 33.051],
    ['model_name_2', 79.492, 39.002],
    ['model_name_4', 73.203, 45.391],
];

export const options = {
    // title: 'ACC',
    chartArea: { width: '70%', height: '82%' },
    colors: ['#3498DB', '#FF6B6B'],
    legend: { position: 'top' },
    hAxis: {
        minValue: 0,
        maxValue: 100,
    },
    bar: { groupWidth: '87%' },
};

function GraphChart() {
    return <Chart chartType='BarChart' width={'100%'} height={'100%'} data={data} options={options} />;
}

export default GraphChart;

import { Chart } from 'react-google-charts';

function GraphChart({ topFive }) {
    const options = {
        // title: 'ACC',
        chartArea: { width: '80%', height: '89%' },
        colors: ['#3498DB', '#FF6B6B'],
        legend: { position: 'right' },
        hAxis: {
            minValue: 0,
            maxValue: 100,
        },
        bar: { groupWidth: '87%' },
    };

    const data = [
        ['Top Five Models', 'accuracy', 'loss'],
        [topFive[0]?.model_name, topFive[0]?.accuracy * 100, topFive[0]?.loss * 100],
        [topFive[1]?.model_name, topFive[1]?.accuracy * 100, topFive[1]?.loss * 100],
        [topFive[2]?.model_name, topFive[2]?.accuracy * 100, topFive[2]?.loss * 100],
        [topFive[3]?.model_name, topFive[3]?.accuracy * 100, topFive[3]?.loss * 100],
        [topFive[4]?.model_name, topFive[4]?.accuracy * 100, topFive[4]?.loss * 100],
    ];

    return <Chart chartType='BarChart' width={'100%'} height={'100%'} data={data} options={options} />;
    // return <div>{topFive[0]?.accuracy}</div>;
}

export default GraphChart;

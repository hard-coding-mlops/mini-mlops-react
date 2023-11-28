import { Line } from 'react-chartjs-2';

import styles from './DashBoard.module.css';

function DashBoard() {
  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월'],
    datasets: [
      {
        label: '월간 판매량',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 15, 7, 22, 18],
      },
    ],
  };

  // 차트 옵션 정의
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <Line data={data} options={options} />
    </div>
  );
}

export default DashBoard;

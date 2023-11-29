import PieChart from '../../components/PieChart/PieChart';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';

import styles from './DashBoard.module.css';

const dummyData = {
  model: 'KoBert_1129',
  usage: 32,
  satisfaction: [15, 12, 5],
  accuracy: 82.193,
  loss: 24.932,
};

function DashBoard() {
  return (
    <PageTemplate>
      <HeaderTemplate>
        <div>
          <span style={{ fontWeight: '800' }}>{dummyData.model}</span>
          <br />
          <span style={{ fontWeight: '500' }}>CURRENTLY ACTIVE</span>
        </div>
      </HeaderTemplate>
      <div className={styles.dashBoard}>
        <table className={styles.table}>
          <thead>
            <th className={styles.tableHeaderLabel}>사용 횟수</th>
            <th className={styles.tableHeaderLabel}>사용자 만족도</th>
            <th className={styles.tableHeaderLabel}>정확도</th>
            <th className={styles.tableHeaderLabel}>손실도</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.dataContainer} style={{ fontSize: '7rem', fontWeight: '700' }}>
                  {dummyData.usage}
                </div>
              </td>
              <td>
                <div className={styles.dataContainer}>
                  <PieChart label='' value={dummyData.satisfaction} color='#3498DB' />
                </div>
              </td>
              <td>
                <div className={styles.dataContainer}>
                  <PieChart label='accuracy' value={dummyData.accuracy} color='#3498DB' />
                </div>
              </td>
              <td>
                <div className={styles.dataContainer}>
                  <PieChart backwards={true} label='loss' value={dummyData.loss} color='#FF6B6B' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageTemplate>
  );
}

export default DashBoard;

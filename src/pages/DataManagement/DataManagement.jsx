import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import styles from './DataManagement.module.css';

function DataManagement() {
  return (
    <PageTemplate>
      <HeaderTemplate>
        <span>데이터 관리</span>
      </HeaderTemplate>
      <BodyTemplate>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderLabel} style={{ width: '7rem' }}>
                ID
              </th>
              <th className={styles.tableHeaderLabel}>수집 시작 일시</th>
              <th className={styles.tableHeaderLabel}>수집 종료 일시</th>
              <th className={styles.tableHeaderLabel}>정제 데이터 개수</th>
              <th className={styles.tableHeaderLabel}>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableData}>17</td>
              <td className={styles.tableData}>2023 / 11 / 22 15 : 28</td>
              <td className={styles.tableData}>2023 / 11 / 22 15 : 32</td>
              <td className={styles.tableData}>118</td>
              <td className={styles.tableData}>
                <div className={styles.condition}>
                  <Icon label='csv' />
                  <Icon label='delete' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </BodyTemplate>
    </PageTemplate>
  );
}

export default DataManagement;

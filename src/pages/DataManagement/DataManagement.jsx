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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>수집 시작 일시</th>
              <th>수집 종료 일시</th>
              <th>정제 데이터 개수</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023 / 11 / 22 15 : 28</td>
              <td>model_name_1</td>
              <td>사회 / 82.193%</td>
              <td>정치</td>
              <td>DETAIL.ICON</td>
            </tr>
          </tbody>
        </table>
      </BodyTemplate>
    </PageTemplate>
  );
}

export default DataManagement;

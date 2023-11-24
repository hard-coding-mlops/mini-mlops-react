import { useEffect } from 'react';
import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import styles from './DataManagement.module.css';
import axios from 'axios';
import { useState } from 'react';

const formatDateTime = (dateTimeString) => {
  const inputDate = new Date(dateTimeString);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 만듭니다.
  const day = inputDate.getDate().toString().padStart(2, '0');

  const hours = inputDate.getHours().toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${year} / ${month} / ${day}   ${hours} : ${minutes}`;

  return formattedDateTime;
};

function DataManagement() {
  const [totalOrderedData, setTotalOrderedData] = useState([]);

  const downloadPreprocessedArticles = async (id) => {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/data_management/download-preprocessed-data?id=${id}`,
      {
        responseType: 'blob',
      },
    );

    // Blob을 파일로 변환
    const blob = new Blob([result.data], { type: 'text/csv' });

    // Blob을 다운로드 링크로 변환
    const url = URL.createObjectURL(blob);

    // 다운로드 링크 생성
    const a = document.createElement('a');
    a.href = url;
    a.download = `preprocessed_data_${id}.csv`;

    // 다운로드 링크 클릭
    a.click();

    // URL 해제
    URL.revokeObjectURL(url);
  };

  const getTotalOrderedData = async () => {
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data_management/total-ordered-data`);
    console.log(result);
    setTotalOrderedData(result.data.total_ordered_data);
  };
  useEffect(() => {
    getTotalOrderedData();
  }, []);

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
            {/* 8개 페이지네이션 */}
            {totalOrderedData.map((data) => {
              return (
                <tr key={data.scraped_order_no}>
                  <td className={styles.tableData}>{data.scraped_order_no}</td>
                  <td className={styles.tableData}>{formatDateTime(data.start_datetime)}</td>
                  <td className={styles.tableData}>{formatDateTime(data.end_datetime)}</td>
                  <td className={styles.tableData}>{data.preprocessed_articles_length}</td>
                  <td className={styles.tableData}>
                    <div className={styles.condition}>
                      <Icon label='csv' handleOnClick={() => downloadPreprocessedArticles(data.scraped_order_no)} />
                      <Icon label='delete' />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </BodyTemplate>
    </PageTemplate>
  );
}

export default DataManagement;

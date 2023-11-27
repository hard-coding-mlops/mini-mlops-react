import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BodyTemplate from '../PageTemplate/BodyTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import Loading from '../Loading/Loading';

import { formatDateTime } from '../../utils/formatters';

import styles from './DataDetail.module.css';

function DataDetail() {
  const { dataId } = useParams();
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataDetails = async () => {
    setIsLoading(true);
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data_management/single-group/${dataId}`);
    console.log(result.data);
    setStartDateTime(formatDateTime(result.data.scraped_order.start_datetime));
    setEndDateTime(formatDateTime(result.data.scraped_order.end_datetime));
    setArticles(result.data.preprocessed_articles);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataDetails();
  }, []);

  return (
    <PageTemplate>
      {isLoading && <Loading message={'데이터 가져오는 중'} />}
      <HeaderTemplate>수집 데이터 상세 정보</HeaderTemplate>
      <BodyTemplate>
        <table>
          <tbody>
            <tr>
              <td className={styles.label}>ID</td>
              <td className={styles.data}>{dataId}</td>
            </tr>
            <tr>
              <td className={styles.label}>수집 시작 일시</td>
              <td className={styles.data} colSpan={2} style={{ whiteSpace: 'pre-wrap' }}>
                {startDateTime}
              </td>
            </tr>
            <tr>
              <td className={styles.label}>수집 종료 일시</td>
              <td className={styles.data} colSpan={2} style={{ whiteSpace: 'pre-wrap' }}>
                {endDateTime}
              </td>
            </tr>
            <tr>
              <td className={styles.label}>데이터</td>
            </tr>
            <tr>
              <td className={styles.label}>DATA_ID</td>
              <td className={styles.label}>CATEGORY_NO</td>
              <td className={styles.label}>EMBEDDED_INPUTS</td>
            </tr>
            {articles.map((article) => {
              return (
                <tr>
                  <td className={styles.data}>{article.id}</td>
                  <td className={styles.data}>{article.category_no}</td>
                  <td className={styles.data}>{article.embedded_inputs}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </BodyTemplate>
    </PageTemplate>
  );
}

export default DataDetail;

import { useEffect, useState } from 'react';
import axios from 'axios';

import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import Loading from '../Loading/Loading';

import styles from './DataManagement.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const formatDateTime = (dateTimeString) => {
  const inputDate = new Date(dateTimeString);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');

  const hours = inputDate.getHours().toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${year} / ${month} / ${day}   ${hours} : ${minutes}`;

  return formattedDateTime;
};

function DataManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageQuery = Number(new URLSearchParams(location.search).get('page')) || 1;

  const [totalOrderedData, setTotalOrderedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1700);
  const [totalPages, setTotalPages] = useState(1);

  // APIs
  // TODO: page 추가
  const calculatePages = async () => {
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data_management/total-ordered-data`);
    const pages = Math.ceil(result.data.total_ordered_data.length / 10);
    setTotalPages(pages);
  };
  const getTotalOrderedData = async (pageNumber) => {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/data_management/total-ordered-data?skip=${10 * (pageNumber - 1)}&limit=10`
    );
    setTotalOrderedData(result.data.total_ordered_data);
  };
  const addNewArticles = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/data_management/scrape-and-preprocess`);
      window.location.reload();
      setIsLoading(false);
    }
  };
  const downloadPreprocessedArticles = async (id) => {
    if (!isLoading) {
      setIsLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/data_management/download-preprocessed-data/${id}`,
        {
          responseType: 'blob',
        }
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
      setIsLoading(false);
    }
  };
  const deleteArticles = async (id) => {
    if (!isLoading) {
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/data_management/single-group/${id}`);
      window.location.reload();
      setIsLoading(false);
    }
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1700);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    calculatePages();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    getTotalOrderedData(pageQuery);
  }, [pageQuery]);

  return (
    <PageTemplate>
      {isLoading && <Loading />}
      <HeaderTemplate>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>데이터 관리</span>
          <Icon
            label='add'
            handleOnClick={() => {
              addNewArticles();
            }}
          />
        </div>
      </HeaderTemplate>
      <BodyTemplate>
        <div className={styles.tableContainer}>
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
              {totalOrderedData.map((data) => {
                return (
                  <tr
                    key={data.scraped_order_no}
                    onClick={() => {
                      navigate(`/data/${data.scraped_order_no}`);
                    }}
                    className={styles.tableRow}
                  >
                    <td className={styles.tableData}>{data.scraped_order_no}</td>
                    <td className={`${styles.tableData} ${isSmallScreen ? styles.smallScreen : ''}`}>
                      {formatDateTime(data.start_datetime)}
                    </td>
                    <td className={`${styles.tableData} ${isSmallScreen ? styles.smallScreen : ''}`}>
                      {formatDateTime(data.end_datetime)}
                    </td>
                    <td className={styles.tableData}>{data.preprocessed_articles_length}</td>
                    <td className={styles.tableData}>
                      <div className={styles.condition}>
                        <Icon
                          label='csv'
                          handleOnClick={(e) => {
                            e.stopPropagation();
                            downloadPreprocessedArticles(data.scraped_order_no);
                          }}
                        />
                        <Icon
                          label='delete'
                          handleOnClick={(e) => {
                            e.stopPropagation();
                            deleteArticles(data.scraped_order_no);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>{' '}
        <div className={styles.pageButtonContainer}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${styles.pageButton} ${pageQuery === index + 1 ? styles.currentPage : ''}`}
              onClick={() => {
                navigate(`/data?page=${index + 1}`);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </BodyTemplate>
    </PageTemplate>
  );
}
// 1510px
export default DataManagement;

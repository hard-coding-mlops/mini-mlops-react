import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import Loading from '../Loading/Loading';

import { formatDateTime } from '../../utils/formatters';

import styles from './DataManagement.module.css';

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
        const result = await axios.get(
            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/total-ordered-data`,
            {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            }
        );
        const pages = Math.ceil(result.data.total_ordered_data.length / 10);
        setTotalPages(pages);
    };
    const getTotalOrderedData = async (pageNumber) => {
        setIsLoading(true);
        const result = await axios.get(
            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/total-ordered-data?skip=${
                10 * (pageNumber - 1)
            }&limit=10`,
            {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            }
        );
        console.log('[TOTAL DATA]', result.data.total_ordered_data);
        setTotalOrderedData(result.data.total_ordered_data);
        setIsLoading(false);
    };
    const addNewArticles = async () => {
        if (!isLoading) {
            setIsLoading(true);
            await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/scrape-and-preprocess`, {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            });
            window.location.reload();
            setIsLoading(false);
        }
    };
    const downloadPreprocessedArticles = async (id) => {
        if (!isLoading) {
            setIsLoading(true);
            const result = await axios.get(
                `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/download-preprocessed-data/${id}`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'any-value',
                    },
                },
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
            await axios.delete(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/single-group/${id}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            });
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
            {isLoading && <Loading message={'데이터 가져오는 중'} />}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'데이터 관리'} routes={'data'} />
                <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Icon
                        label='add'
                        handleOnClick={() => {
                            addNewArticles();
                        }}
                    />
                </div>
            </div>
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
                                <th className={styles.tableHeaderLabel}>데이터 개수</th>
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
                                        <td
                                            className={`${styles.tableData} ${isSmallScreen ? styles.smallScreen : ''}`}
                                        >
                                            {formatDateTime(data.start_datetime)}
                                        </td>
                                        <td
                                            className={`${styles.tableData} ${isSmallScreen ? styles.smallScreen : ''}`}
                                        >
                                            {formatDateTime(data.end_datetime)}
                                        </td>
                                        <td className={styles.tableData}>{data.preprocessed_articles_count}</td>
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

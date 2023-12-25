import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setScrapeProgress } from '../../actions/sidebarActions';

import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';

import { formatDateTime } from '../../utils/formatters';

import styles from './DataManagement.module.css';

function DataManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pageQuery = Number(new URLSearchParams(location.search).get('page')) || 1;
    const scrapeProgress = useSelector((state) => state.sidebar.scrapeProgress);

    const [totalOrderedData, setTotalOrderedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1700);
    const [totalPages, setTotalPages] = useState(1);
    const [loggedIn, setLoggedIn] = useState(true);

    // APIs
    // TODO: page 추가
    const calculatePages = async () => {
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/total-ordered-data`);
        const pages = Math.ceil(result.data.total_ordered_data.length / 10);
        setTotalPages(pages);
    };
    const getTotalOrderedData = async (pageNumber) => {
        setIsLoading(true);
        const result = await axios.get(
            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/total-ordered-data?skip=${
                10 * (pageNumber - 1)
            }&limit=10`
        );
        console.log('[TOTAL DATA]', result.data.total_ordered_data);
        setTotalOrderedData(result.data.total_ordered_data);
        setIsLoading(false);
    };
    const addNewArticles = async () => {
        toast.success('데이터 수집 시작');
        try {
            const response = await fetch(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/scraper/scrape`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const readChunk = async () => {
                const result = await reader.read();
                await appendChunks(result);
            };

            const appendChunks = async (result) => {
                const chunk = decoder.decode(result.value || new Uint8Array(), {
                    stream: !result.done,
                });
                const jsonChunks = chunk.split('\n').filter(Boolean);

                for (const jsonChunk of jsonChunks) {
                    const trimmedChunk = jsonChunk.replace(/^data: /, ''); // "data: " 제거
                    try {
                        const parsedData = JSON.parse(trimmedChunk);
                        console.log(`${parsedData.kind}, ${parsedData.progress}%`);
                        dispatch(setScrapeProgress(parsedData.progress));
                    } catch (error) {
                        console.error('JSON 파싱 중 오류 발생:', error);
                    }
                }

                if (!result.done) {
                    await readChunk();
                }
            };

            await readChunk();
            toast.success('데이터 수집 끝');
        } catch (error) {
            // toast.error(error.message);
            toast.error('[ERROR] 콘솔 확인');
            console.log(error);
        }
    };
    const preprocessArticles = async () => {
        toast.success('데이터 정제 시작');
        try {
            const response = await fetch(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/preprocessor/preprocess`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const readChunk = async () => {
                const result = await reader.read();
                await appendChunks(result);
            };
            const appendChunks = async (result) => {
                const chunk = decoder.decode(result.value || new Uint8Array(), {
                    stream: !result.done,
                });
                const jsonChunks = chunk.split('\n').filter(Boolean);

                for (const jsonChunk of jsonChunks) {
                    const trimmedChunk = jsonChunk.replace(/^data: /, ''); // "data: " 제거
                    try {
                        const parsedData = JSON.parse(trimmedChunk);
                        console.log(`${parsedData.kind}, ${parsedData.progress}%`);
                        dispatch(setScrapeProgress(parsedData.progress));
                    } catch (error) {
                        console.error('JSON 파싱 중 오류 발생:', error);
                    }
                }

                if (!result.done) {
                    await readChunk();
                }
            };

            await readChunk();
            toast.success('데이터 정제 끝');
        } catch (error) {
            // toast.error(error.message);
            toast.error('[ERROR] 콘솔 확인');
            console.log(error);
        }
    };
    const downloadPreprocessedArticles = async (id) => {
        if (!isLoading) {
            setIsLoading(true);
            const result = await axios.get(
                `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/download-preprocessed-data/${id}`,
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
            await axios.delete(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/single-group/${id}`);
            window.location.reload();
            setIsLoading(false);
        }
    };

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1700);
    };

    useEffect(() => {
        localStorage.setItem('previousPath', '/data');
        const token = localStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }, []);
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'데이터 관리'} routes={'data'} />
                <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Icon
                        label='add'
                        handleOnClick={async () => {
                            if (!loggedIn) {
                                toast.error('로그인이 필요합니다.');
                                return;
                            }
                            if (scrapeProgress !== 0) {
                                toast.error('데이터가 이미 수집 중에 있습니다.');
                                return;
                            }
                            await addNewArticles();
                            await preprocessArticles();
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
                            {totalOrderedData.map((data, index) =>
                                isLoading || !loggedIn ? (
                                    <tr key={index}>
                                        <td colSpan={5}>
                                            <div style={{ height: '0.5rem' }}></div>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                            <div style={{ height: '0.5rem' }}></div>
                                        </td>
                                    </tr>
                                ) : (
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
                                )
                            )}
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

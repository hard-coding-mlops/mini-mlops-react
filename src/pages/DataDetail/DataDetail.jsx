import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@mui/material';

import BodyTemplate from '../PageTemplate/BodyTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';

import { formatDateTime } from '../../utils/formatters';

import styles from './DataDetail.module.css';
import Icon from '../../components/Icon/Icon';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function DataDetail() {
    const navigate = useNavigate();
    const { dataId } = useParams();
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const getDataDetails = async () => {
        setIsLoading(true);
        const result = await axios.get(
            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/single-group/${dataId}`
        );
        console.log(result.data);
        setStartDateTime(formatDateTime(result.data.scraped_order.start_datetime));
        setEndDateTime(formatDateTime(result.data.scraped_order.end_datetime));
        setArticles(result.data.preprocessed_articles);
        setIsLoading(false);
    };
    const deleteArticles = async (id) => {
        setDeleteLoading(true);
        await axios.delete(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/single-group/${id}`);
        setDeleteLoading(false);
        navigate('/data');
    };

    useEffect(() => {
        getDataDetails();
    }, []);

    return (
        <PageTemplate>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'데이터 관리'} routes={`data / ${dataId}`} />
                <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {deleteLoading ? (
                        <div className={styles.loadingSpinner}></div>
                    ) : (
                        <Icon
                            label='delete'
                            handleOnClick={() => {
                                deleteArticles(dataId);
                            }}
                        />
                    )}
                </div>
            </div>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td className={styles.label}>ID</td>
                                {isLoading ? (
                                    <td>
                                        <div style={{ height: '0.5rem' }}></div>
                                        <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        <div style={{ height: '0.5rem' }}></div>
                                    </td>
                                ) : (
                                    <td className={styles.data}>{dataId}</td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>수집 시작 일시</td>
                                {isLoading ? (
                                    <td>
                                        <div style={{ height: '0.5rem' }}></div>
                                        <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        <div style={{ height: '0.5rem' }}></div>
                                    </td>
                                ) : (
                                    <td className={styles.data} colSpan={2} style={{ whiteSpace: 'pre-wrap' }}>
                                        {startDateTime}
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>수집 종료 일시</td>
                                {isLoading ? (
                                    <td>
                                        <div style={{ height: '0.5rem' }}></div>
                                        <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        <div style={{ height: '0.5rem' }}></div>
                                    </td>
                                ) : (
                                    <td className={styles.data} colSpan={2} style={{ whiteSpace: 'pre-wrap' }}>
                                        {endDateTime}
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>데이터 수</td>
                                {isLoading ? (
                                    <td>
                                        <div style={{ height: '0.5rem' }}></div>
                                        <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        <div style={{ height: '0.5rem' }}></div>
                                    </td>
                                ) : (
                                    <td className={styles.data}>{articles.length} 개</td>
                                )}
                            </tr>
                            <tr>
                                <td className={styles.label}>DATA_ID</td>
                                <td className={styles.label}>CATEGORY_NO</td>
                                <td className={styles.label} colSpan={3}>
                                    EMBEDDED_INPUTS
                                </td>
                            </tr>

                            {isLoading ? (
                                <td colSpan={5}>
                                    <div style={{ width: '100%', height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'150px'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                articles.map((article) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <div className={styles.preprocessedData}>{article.id}</div>
                                                </td>
                                                <td className={styles.preprocessedData}>{article.category_no}</td>
                                                <td colSpan={3}>
                                                    <div className={styles.formattedText}>{article.formatted_text}</div>
                                                </td>
                                            </tr>
                                            <br />
                                        </>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default DataDetail;

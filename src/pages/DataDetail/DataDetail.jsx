import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BodyTemplate from '../PageTemplate/BodyTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import Loading from '../Loading/Loading';

import { formatDateTime } from '../../utils/formatters';

import styles from './DataDetail.module.css';
import Icon from '../../components/Icon/Icon';

function DataDetail() {
    const { dataId } = useParams();
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getDataDetails = async () => {
        setIsLoading(true);
        const result = await axios.get(
            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/data_management/single-group/${dataId}`,
            {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            }
        );
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'데이터 관리'} routes={`data / ${dataId}`} />
            </div>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td className={styles.label}>ID</td>
                                <td className={styles.data}>{dataId}</td>
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>수집 시작 일시</td>
                                <td className={styles.data} colSpan={2} style={{ whiteSpace: 'pre-wrap' }}>
                                    {startDateTime}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>수집 종료 일시</td>
                                <td className={styles.data} colSpan={2} style={{ whiteSpace: 'pre-wrap' }}>
                                    {endDateTime}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>데이터 수</td>
                                <td className={styles.data}>{articles.length} 개</td>
                            </tr>
                            <tr>
                                <td className={styles.label}>DATA_ID</td>
                                <td className={styles.label}>CATEGORY_NO</td>
                                <td className={styles.label} colSpan={3}>
                                    EMBEDDED_INPUTS
                                </td>
                            </tr>
                            {articles.map((article) => {
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
                            })}
                        </tbody>
                    </table>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default DataDetail;

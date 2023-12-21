import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@mui/material';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import Icon from '../../components/Icon/Icon';
import { formatDateTime } from '../../utils/formatters';

import styles from './UserLogManagement.module.css';

function UserLogManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const pageQuery = Number(new URLSearchParams(location.search).get('page')) || 1;

    const [userLogs, setUserLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // APIs
    // TODO: page 추가
    const calculatePages = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/clients`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        console.log(result.data.data);
        const pages = Math.ceil(result.data.data.length / 10);
        setTotalPages(pages);
        setIsLoading(false);
    };
    const getUserLogs = async (pageNumber) => {
        // setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/clients?skip=${10 * (pageNumber - 1)}&limit=10`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'any-value',
                    },
                }
            );
            // setIsLoading(false);
            console.log('[TOTAL USER LOGS]', response.data.data);
            setUserLogs(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        calculatePages();
        getUserLogs(pageQuery);
    }, [pageQuery]);

    return (
        <PageTemplate>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'사용자 로그'} routes={'user - log'} />
            </div>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th className={styles.tableHeaderLabel}>ID</th>
                                <th className={styles.tableHeaderLabel}>예측 모델</th>
                                <th className={styles.tableHeaderLabel}>사용 일시</th>
                                <th className={styles.tableHeaderLabel}>예측 결과</th>
                                <th className={styles.tableHeaderLabel}>기대 결과</th>
                                <th className={styles.tableHeaderLabel}>정확도</th>
                                {/* <th className={styles.tableHeaderLabel}>상태</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {userLogs.map((userLog, index) =>
                                isLoading ? (
                                    <tr key={index}>
                                        <td colSpan={6}>
                                            <div style={{ height: '0.5rem' }}></div>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                            <div style={{ height: '0.5rem' }}></div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr
                                        key={userLog.client_id}
                                        onClick={() => {
                                            navigate(`/user-log/${userLog.client_id}`);
                                        }}
                                        className={styles.tableRow}
                                    >
                                        <td className={styles.tableData}>{userLog.client_id}</td>
                                        <td className={styles.tableData}>{userLog.model_name}</td>
                                        <td className={`${styles.tableData} `}>{formatDateTime(userLog.use_at)}</td>
                                        <td className={styles.tableData}>{userLog.predict_result}</td>
                                        <td className={styles.tableData}>{userLog.client_result}</td>
                                        <td className={styles.tableData}>{(userLog.acc * 100).toFixed(2)} %</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.pageButtonContainer}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`${styles.pageButton} ${pageQuery === index + 1 ? styles.currentPage : ''}`}
                            onClick={() => {
                                navigate(`/user-log?page=${index + 1}`);
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

export default UserLogManagement;

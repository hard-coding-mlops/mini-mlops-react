import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';

import styles from './UserLogManagement.module.css';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import axios from 'axios';
import { useEffect } from 'react';

const dummyData = [
    {
        id: 1,
        datetime: '2021 / 08 / 01   12 : 00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12 : 00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   13 : 38',
        model: 'model_name_2',
        predict: '사회',
        expected: '정치',
        accuracy: '73.578%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12 : 00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12:00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12:00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12 : 00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12:00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
    {
        id: 1,
        datetime: '2021 / 08 / 01   12:00',
        model: 'model_name_1',
        predict: '사회',
        expected: '사회',
        accuracy: '84.912%',
    },
];

function UserLogManagement() {
    const navigate = useNavigate();

    const getUserLogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_COLAB_SERVER_URL}/model/user-logs`, {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserLogs();
    }, []);

    return (
        <PageTemplate>
            <HeaderTemplate>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>사용자 이용 로그</span>
                    <Icon
                        label='service'
                        handleOnClick={() => {
                            navigate('/classify');
                        }}
                    />
                </div>
            </HeaderTemplate>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th className={styles.tableHeaderLabel}>사용 일시</th>
                                <th className={styles.tableHeaderLabel}>예측 모델</th>
                                <th className={styles.tableHeaderLabel}>예측 결과</th>
                                <th className={styles.tableHeaderLabel}>기대 결과</th>
                                <th className={styles.tableHeaderLabel}>정확도</th>
                                {/* <th className={styles.tableHeaderLabel}>상태</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((data) => {
                                return (
                                    <tr
                                        key={data.id}
                                        onClick={() => {
                                            navigate(`/user-log/${data.id}`);
                                        }}
                                        className={styles.tableRow}
                                    >
                                        <td className={styles.tableData}>{data.model}</td>
                                        <td className={`${styles.tableData} `}>{data.datetime}</td>
                                        <td className={styles.tableData}>{data.predict}</td>
                                        <td className={styles.tableData}>{data.expected}</td>
                                        <td className={styles.tableData}>{data.accuracy}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default UserLogManagement;

import { useEffect, useState } from 'react';
import axios from 'axios';
import SlotCounter from 'react-slot-counter';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import Loading from '../Loading/Loading';
import PieChartComponent from '../../components/ChartComponent/PieChartComponent';
import PieChartTwoElements from '../../components/ChartComponent/PieChartTwoElements';
import LineChartComponent from '../../components/ChartComponent/LineChartComponent';

import styles from './DashBoard.module.css';

const dummyData = {
    model: 'KoBert_1129',
    usage: 32,
    evaluation: [15, 12],
    accuracy: 82.193,
    loss: 24.932,
};

function DashBoard() {
    const [currentModel, setCurrentModel] = useState({});
    const [topFive, setTopFive] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCurrentModel = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/currently-active`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        const { model_name, usage, acc, loss, evaluation_diff, evaluation_equal, evaluation_noresponse } = result.data;
        console.log('[CURRENT MODEL]', {
            model_name,
            usage,
            acc,
            loss,
            evaluation_diff,
            evaluation_equal,
            evaluation_noresponse,
        });
        setCurrentModel({
            model_name,
            usage,
            acc,
            loss,
            evaluation_diff,
            evaluation_equal,
            evaluation_noresponse,
        });
        // setCurrentModel(current_model);
        setIsLoading(false);
    };
    const getTopFive = async () => {
        // setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/top-five`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        console.log('[TOP FIVE]', result.data.data);
        setTopFive(result.data.data);
    };

    useEffect(() => {
        getCurrentModel();
        getTopFive();
    }, []);

    return (
        <PageTemplate>
            {isLoading && <Loading message={'현재 모델을 가져오는 중입니다.'} />}
            <HeaderTemplate title='DASHBOARD' routes='dashboard' model={currentModel.model_name} />
            <BodyTemplate>
                <div className={styles.pieChartContainer}>
                    <br />
                    <div>
                        <span className={styles.chartTitle}>사용 횟수</span>
                        <div
                            style={{
                                width: '300px',
                                height: '270px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                color: '#4A4A4A',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <SlotCounter
                                    value={currentModel.usage * 1 ? currentModel.usage * 1 : ''}
                                    duration={1}
                                    dummyCharacterCount={7}
                                />
                                <span style={{ color: '#7A7A7A', fontSize: '1.3rem', fontWeight: '600' }}>회</span>
                            </div>
                        </div>
                    </div>
                    <svg height='100' width='1'>
                        <line x1='0' y1='0' x2='0' y2='100' style={{ stroke: 'black', strokeWidth: '1' }} />
                    </svg>
                    <div>
                        <span className={styles.chartTitle}>사용자 만족도</span>
                        <PieChartComponent
                            data={[
                                { name: '만족', value: currentModel.evaluation_equal },
                                { name: '무응답', value: currentModel.evaluation_noresponse },
                                { name: '불만족', value: currentModel.evaluation_diff },
                            ]}
                        />
                    </div>
                    <br />
                    <div>
                        <span className={styles.chartTitle}>정확도</span>
                        <PieChartTwoElements
                            data={[
                                {
                                    name: `${
                                        // 소수점 버림
                                        Math.round(currentModel.acc * 100)
                                    } %`,
                                    value: currentModel.acc,
                                },
                                { name: '-', value: 1 - currentModel.acc },
                            ]}
                        />
                    </div>
                    <br />
                    <div>
                        <span className={styles.chartTitle}>손실도</span>
                        <PieChartTwoElements
                            data={[
                                {
                                    name: `${
                                        // 소수점 버림
                                        Math.round(currentModel.loss * 100)
                                    } %`,
                                    value: currentModel.loss,
                                },
                                { name: '-', value: 1 - currentModel.loss },
                            ]}
                        />
                    </div>
                    <br />
                </div>
                <br />
                <div className={styles.bottomContainer}>
                    <div>
                        <span className={styles.chartTitle}>손실도</span>
                        <LineChartComponent />
                    </div>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default DashBoard;

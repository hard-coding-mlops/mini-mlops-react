import { useEffect, useState } from 'react';
import axios from 'axios';
import SlotCounter from 'react-slot-counter';

import PieChart from '../../components/PieChart/PieChart';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import GraphChart from '../../components/GraphChart/GraphChart';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import styles from './DashBoard.module.css';
import Loading from '../Loading/Loading';

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
        const result = await axios.get(`${process.env.REACT_APP_COLAB_SERVER_URL}/model/currently-active`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        const { model_name, usage, acc, loss, evaluation_diff, evaluation_equal, evaluation_noresponse } = result.data;
        console.log(result.data);
        setCurrentModel({
            model_name,
            usage,
            acc,
            loss,
            evaluation_diff,
            evaluation_equal,
            evaluation_noresponse,
        });
        console.log({ model_name, usage, acc, loss, evaluation_diff, evaluation_equal, evaluation_noresponse });
        // setCurrentModel(current_model);
        setIsLoading(false);
    };
    const getTopFive = async () => {
        // setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_COLAB_SERVER_URL}/model/top-five`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        setTopFive(result.data.data);
    };

    useEffect(() => {
        getCurrentModel();
        getTopFive();
    }, []);

    return (
        <PageTemplate>
            {isLoading && <Loading message={'현재 모델을 가져오는 중입니다.'} />}
            <HeaderTemplate>
                <div>
                    <span style={{ fontWeight: '700', fontSize: '1.4rem' }}>현재 배포된 모델</span>
                    <br />
                    <span style={{ fontWeight: '800', fontSize: '2rem' }}>{currentModel.model_name}</span>
                </div>
            </HeaderTemplate>
            <div className={styles.dashBoard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeaderLabel}>사용 횟수</th>
                            <th className={styles.tableHeaderLabel}>사용자 만족도</th>
                            <th className={styles.tableHeaderLabel}>정확도</th>
                            <th className={styles.tableHeaderLabel}>손실도</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles.dataContainer} style={{ fontSize: '7rem', fontWeight: '700' }}>
                                    <SlotCounter value={currentModel.usage * 1} duration={1} dummyCharacterCount={7} />
                                </div>
                            </td>
                            <td>
                                <div className={styles.dataContainer} style={{ margin: '0 2rem' }}>
                                    <PieChart
                                        label=''
                                        value={[
                                            currentModel.evaluation_equal,
                                            currentModel.evaluation_noresponse,
                                            currentModel.evaluation_diff,
                                        ]}
                                        color='#3498DB'
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={styles.dataContainer}>
                                    <PieChart
                                        label='accuracy'
                                        value={Math.round(currentModel.acc * 100)}
                                        color='#3498DB'
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={styles.dataContainer}>
                                    <PieChart
                                        backwards={true}
                                        label='loss'
                                        value={Math.round(currentModel.loss * 100)}
                                        color='#FF6B6B'
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <HeaderTemplate>성능 TOP 5 모델</HeaderTemplate>
            <div className={styles.chartContainer}>
                <GraphChart topFive={topFive} />
                {/* <div className={styles.autoPipeline}>
                    <LoadingSpinner />
                </div> */}
            </div>
        </PageTemplate>
    );
}

export default DashBoard;

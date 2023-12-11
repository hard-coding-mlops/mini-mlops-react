import { useEffect, useState } from 'react';
import axios from 'axios';
import SlotCounter from 'react-slot-counter';

import PieChart from '../../components/PieChart/PieChart';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import GraphChart from '../../components/GraphChart/GraphChart';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

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

    const getCurrentModel = async () => {
        // const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/model/currently-active`, {
        //     headers: {
        //         'ngrok-skip-browser-warning': 'any-value',
        //     },
        // });
        const current_model = {
            model_id: 1,
            model_name: 'bertmodel',
            usage: 32,
            evaluation: [15, 7],
            accuracy: 0.82132,
            loss: 0.42132,
        };
        // setCurrentModel(result.data.data);
        setCurrentModel(current_model);
    };
    const getTopFive = async () => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/model/top-five`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        const top_five_models = [
            { model_id: 1, model_name: 'bertmodel', accuracy: 0.82132, loss: 0.42132 },
            { model_id: 18, model_name: 'model_18', accuracy: 0.7931, loss: 0.48901 },
            { model_id: 22, model_name: 'model_22', accuracy: 0.78162, loss: 0.58031 },
            { model_id: 21, model_name: 'model_21', accuracy: 0.35111, loss: 0.9146 },
            { model_id: 15, model_name: 'model_1', accuracy: 0.1, loss: 0.9899 },
        ];
        // setTopFive(result.data.data);
        setTopFive(top_five_models);
    };

    useEffect(() => {
        getCurrentModel();
        getTopFive();
    }, []);

    return (
        <PageTemplate>
            <HeaderTemplate>
                <div>
                    <span style={{ fontWeight: '800' }}>{dummyData.model}</span>
                    <br />
                    <span style={{ fontWeight: '500' }}>CURRENTLY ACTIVE</span>
                </div>
            </HeaderTemplate>
            <div className={styles.dashBoard}>
                <table className={styles.table}>
                    <thead>
                        <th className={styles.tableHeaderLabel}>사용 횟수</th>
                        <th className={styles.tableHeaderLabel}>사용자 만족도</th>
                        <th className={styles.tableHeaderLabel}>정확도</th>
                        <th className={styles.tableHeaderLabel}>손실도</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles.dataContainer} style={{ fontSize: '7rem', fontWeight: '700' }}>
                                    {/* <SlotCounter value={currentModel.usage} duration={1.8} dummyCharacterCount={15} /> */}
                                    {currentModel.usage}
                                </div>
                            </td>
                            <td>
                                <div className={styles.dataContainer} style={{ margin: '0 2rem' }}>
                                    <PieChart label='' value={dummyData.evaluation} color='#3498DB' />
                                </div>
                            </td>
                            <td>
                                <div className={styles.dataContainer}>
                                    <PieChart label='accuracy' value={dummyData.accuracy} color='#3498DB' />
                                </div>
                            </td>
                            <td>
                                <div className={styles.dataContainer}>
                                    <PieChart backwards={true} label='loss' value={dummyData.loss} color='#FFA500' />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <HeaderTemplate>성능 TOP 5 모델</HeaderTemplate>
            <div className={styles.chartContainer}>
                <GraphChart topFive={topFive} />
                <div className={styles.autoPipeline}>
                    <LoadingSpinner />
                </div>
            </div>
        </PageTemplate>
    );
}

export default DashBoard;

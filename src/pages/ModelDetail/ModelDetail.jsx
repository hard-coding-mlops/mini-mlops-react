import { useParams } from 'react-router-dom';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';

import styles from './ModelDetail.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Icon from '../../components/Icon/Icon';

function ModelDetail() {
    const { modelId } = useParams();
    const [modelInfo, setModelInfo] = useState({});
    const [graph, setGraph] = useState({});
    const [epochs, setEpochs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getModelInfo = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_COLAB_SERVER_URL}/model/${modelId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        console.log(result.data);
        setModelInfo(result.data.model);

        const { acc_graph, loss_graph, confusion_graph } = result.data.graph;
        setGraph({ acc_graph, loss_graph, confusion_graph });

        const extractedEpochs = result.data.epoch.map(
            ({ epoch_number, train_acc, train_loss, test_acc, test_loss }) => ({
                epoch_number,
                train_acc,
                train_loss,
                test_acc,
                test_loss,
            })
        );
        setEpochs(extractedEpochs);
        setIsLoading(false);
    };

    useEffect(() => {
        getModelInfo();
    }, []);

    return (
        <PageTemplate>
            {isLoading && <Loading message={'모델 가져오는 중'} />}
            <HeaderTemplate>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{modelInfo.model_name} &nbsp; 상세 정보</span>
                    <Icon
                        label='deploy'
                        handleOnClick={async (e) => {
                            e.stopPropagation();
                            // model.model_id
                            const result = await axios.get(
                                `${process.env.REACT_APP_COLAB_SERVER_URL}/model/deploy/${modelInfo.model_id}`,
                                {
                                    headers: {
                                        'ngrok-skip-browser-warning': 'any-value',
                                    },
                                }
                            );
                            alert(`ID) ${modelInfo.model_id}, 모델명) ${modelInfo.model_name} 배포되었습니다.`);
                        }}
                    />
                </div>
            </HeaderTemplate>
            <BodyTemplate>
                {/* <div className={styles.tableContainer}> */}
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.label}>학습 모델</td>
                            <td colSpan={8} className={styles.data}>
                                KoBERT (BERT BASE)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>정확도</td>
                            <td colSpan={4} className={styles.data}>
                                {modelInfo.acc * 100} %
                            </td>
                            <td colSpan={2} className={styles.label}>
                                이전 최고 성능 대비
                            </td>
                            <td colSpan={2} className={styles.data}>
                                {modelInfo.improvement} %
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>파라미터</td>
                            <td colSpan={2} className={styles.data}>
                                [EPOCHS]
                            </td>
                            <td className={styles.data}>{modelInfo.num_epochs}</td>
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [MAX GRAD NORM]
                            </td>
                            <td className={styles.data}>{modelInfo.max_grad_norm}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [BATCH SIZE]
                            </td>
                            <td className={styles.data}>{modelInfo.batch_size}</td>
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [LEARNING RATE]
                            </td>
                            <td className={styles.data}>{modelInfo.learning_rate}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [MAX LENGTH]
                            </td>
                            <td className={styles.data}>{modelInfo.max_length}</td>
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [SPLIT RATE]
                            </td>
                            <td className={styles.data}>{modelInfo.split_rate}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [WARMUP RATIO]
                            </td>
                            <td className={styles.data}>{modelInfo.warmup_ratio}</td>
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>최근 학습 일시</td>
                            <td colSpan={4} className={styles.data}>
                                {modelInfo.created_at}
                            </td>
                            <td colSpan={2} className={styles.label}>
                                최근 배포 일시
                            </td>
                            <td colSpan={2} className={styles.data}>
                                {modelInfo.deployed_at}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>데이터 수</td>
                            <td colSpan={8} className={styles.data}>
                                {modelInfo.data_length * 8} 개 &nbsp; ( 카테고리 당 {modelInfo.data_length} 개씩 )
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '72vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>학습 과정 및 결과</td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.chartContainer}>
                    <table className={styles.chartTable}>
                        <tbody>
                            <tr>
                                <td className={styles.chartTableLabel}>Epoch</td>
                                <td className={styles.chartTableLabel}>Train Accuracy</td>
                                <td className={styles.chartTableLabel}>Train Loss</td>
                                <td className={styles.chartTableLabel}>Test Accuracy</td>
                                <td className={styles.chartTableLabel}>Test Loss</td>
                            </tr>
                            {epochs.map(({ epoch_number, train_acc, train_loss, test_acc, test_loss }) => (
                                <tr key={epoch_number}>
                                    <td className={styles.chartTableData}>{epoch_number}</td>
                                    <td className={styles.chartTableData}>{train_acc}</td>
                                    <td className={styles.chartTableData}>{train_loss}</td>
                                    <td className={styles.chartTableData}>{test_acc}</td>
                                    <td className={styles.chartTableData}>{test_loss}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div className={styles.graphs}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            {graph.acc_graph && (
                                <>
                                    <span style={{ position: 'relative', top: '2rem' }}>훈련 및 검증 정확도</span>
                                    <img
                                        src={`data:image/jpg;base64,${graph.acc_graph}`}
                                        alt='accuracy'
                                        className={styles.accLossGraphs}
                                    />
                                </>
                            )}
                            {graph.loss_graph && (
                                <>
                                    <span style={{ position: 'relative', top: '2rem' }}>훈련 및 검증 손실도</span>
                                    <img
                                        src={`data:image/jpg;base64,${graph.loss_graph}`}
                                        alt='loss'
                                        className={styles.accLossGraphs}
                                    />
                                </>
                            )}
                        </div>
                        {graph.confusion_graph && (
                            <div className={styles.confusionGraphContainer}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td colSpan={4}>혼잡 행렬도</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: '600' }}>정확도</td>
                                            <td style={{ fontWeight: '600' }}>정밀도</td>
                                            <td style={{ fontWeight: '600' }}>민감도</td>
                                            <td style={{ fontWeight: '600' }}>F1</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: '400' }}>
                                                {(modelInfo.accuracy * 100).toFixed(2)} %
                                            </td>
                                            <td style={{ fontWeight: '400' }}>
                                                {(modelInfo.precision_value * 100).toFixed(2)} %
                                            </td>
                                            <td style={{ fontWeight: '400' }}>
                                                {(modelInfo.recall * 100).toFixed(2)} %
                                            </td>
                                            <td style={{ fontWeight: '400' }}>{(modelInfo.f1 * 100).toFixed(2)} %</td>
                                        </tr>
                                    </thead>
                                </table>
                                <img
                                    src={`data:image/jpg;base64,${graph.confusion_graph}`}
                                    alt='confusion'
                                    className={styles.confusionGraph}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default ModelDetail;

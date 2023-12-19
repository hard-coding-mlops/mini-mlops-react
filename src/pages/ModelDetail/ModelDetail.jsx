import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';

import styles from './ModelDetail.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '../../components/Icon/Icon';

function ModelDetail() {
    const navigate = useNavigate();
    const { modelId } = useParams();
    const [modelInfo, setModelInfo] = useState({});
    const [graph, setGraph] = useState({});
    const [epochs, setEpochs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deployLoading, setDeployLoading] = useState(false);

    const getModelInfo = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/${modelId}`, {
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
    const deployModel = async () => {
        setDeployLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/deploy/${modelId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        console.log(result.data);
        toast.success(`${modelInfo.model_name} 배포되었습니다.`);
        setDeployLoading(false);
    };
    useEffect(() => {
        getModelInfo();
    }, []);

    return (
        <PageTemplate>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'모델 관리'} routes={`model / ${modelId}`} />
                <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {deployLoading ? (
                        <div className={styles.loadingSpinner}></div>
                    ) : (
                        <>
                            <Icon
                                label='test'
                                handleOnClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/model/test/${modelInfo.model_name}`);
                                }}
                            />
                            <Icon label='deploy' handleOnClick={deployModel} />
                        </>
                    )}
                </div>
            </div>
            <BodyTemplate>
                {/* <div className={styles.tableContainer}> */}
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.label}>모델 이름</td>
                            {isLoading ? (
                                <td colSpan={4}>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td colSpan={4} className={styles.data}>
                                    {modelInfo.model_name}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>학습 모델</td>
                            <td colSpan={8} className={styles.data}>
                                KoBERT (BERT BASE)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>정확도</td>
                            {isLoading ? (
                                <td colSpan={4}>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td colSpan={4} className={styles.data}>
                                    {/* 소수점 3자리까지 반올림 */}
                                    {Math.round(modelInfo.acc * 100000) / 1000} %
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>파라미터</td>
                            <td colSpan={2} className={styles.data}>
                                [EPOCHS]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.num_epochs}</td>
                            )}
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [MAX GRAD NORM]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.max_grad_norm}</td>
                            )}
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [BATCH SIZE]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.batch_size}</td>
                            )}
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [LEARNING RATE]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.learning_rate}</td>
                            )}
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [MAX LENGTH]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.max_length}</td>
                            )}
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [SPLIT RATE]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.split_rate}</td>
                            )}
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [WARMUP RATIO]
                            </td>
                            {isLoading ? (
                                <td>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'100%'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td className={styles.data}>{modelInfo.warmup_ratio}</td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>최근 학습 일시</td>

                            {isLoading ? (
                                <td colSpan={4}>
                                    <div style={{ height: '0.5rem' }}></div>
                                    <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                    <div style={{ height: '0.5rem' }}></div>
                                </td>
                            ) : (
                                <td colSpan={4} className={styles.data}>
                                    {modelInfo.created_at}
                                </td>
                            )}
                            {/* <td colSpan={2} className={styles.label}>
                                최근 배포 일시
                            </td>
                            <td colSpan={2} className={styles.data}>
                                {modelInfo.deployed_at}
                            </td> */}
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
                                <td colSpan={8} className={styles.data}>
                                    {modelInfo.data_length * 8} 개 &nbsp; ( 카테고리 당 {modelInfo.data_length} 개씩 )
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <hr style={{ width: '89vw', border: '1px solid #e4e4e4' }} />
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
                            {isLoading ? (
                                <>
                                    <tr>
                                        <td colSpan={5}>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                epochs.map(({ epoch_number, train_acc, train_loss, test_acc, test_loss }) => (
                                    <tr key={epoch_number}>
                                        <td className={styles.chartTableData}>{epoch_number}</td>
                                        <td className={styles.chartTableData}>{train_acc}</td>
                                        <td className={styles.chartTableData}>{train_loss}</td>
                                        <td className={styles.chartTableData}>{test_acc}</td>
                                        <td className={styles.chartTableData}>{test_loss}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <br />
                    <div className={styles.graphs}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <div>
                                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>훈련 및 검증 정확도</span>
                            </div>
                            {isLoading ? (
                                <Skeleton variant='rounded' width={'90%'} height={'400px'} />
                            ) : (
                                <img
                                    src={`data:image/jpg;base64,${graph.acc_graph}`}
                                    alt='accuracy'
                                    className={styles.accLossGraphs}
                                />
                            )}

                            <>
                                <div>
                                    <span
                                        style={{
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        훈련 및 검증 손실도
                                    </span>
                                </div>

                                {isLoading ? (
                                    <Skeleton variant='rounded' width={'90%'} height={'400px'} />
                                ) : (
                                    <img
                                        src={`data:image/jpg;base64,${graph.loss_graph}`}
                                        alt='loss'
                                        className={styles.accLossGraphs}
                                    />
                                )}
                            </>
                        </div>
                        {graph.confusion_graph && (
                            <div className={styles.confusionGraphContainer}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td style={{ fontSize: '1rem', fontWeight: 'bold' }} colSpan={4}>
                                                혼잡 행렬도
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: '600' }}>정확도</td>
                                            <td style={{ fontWeight: '600' }}>정밀도</td>
                                            <td style={{ fontWeight: '600' }}>민감도</td>
                                            <td style={{ fontWeight: '600' }}>F1</td>
                                        </tr>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={4}>
                                                    <Skeleton variant='rounded' width={'100%'} height={'2.5rem'} />
                                                </td>
                                            </tr>
                                        ) : (
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
                                                <td style={{ fontWeight: '400' }}>
                                                    {(modelInfo.f1 * 100).toFixed(2)} %
                                                </td>
                                            </tr>
                                        )}
                                    </thead>
                                </table>
                                {isLoading ? (
                                    <Skeleton variant='rounded' width={'100%'} height={'700px'} />
                                ) : (
                                    <img
                                        src={`data:image/jpg;base64,${graph.confusion_graph}`}
                                        alt='confusion'
                                        className={styles.confusionGraph}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default ModelDetail;

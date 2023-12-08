import { useParams } from 'react-router-dom';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';

import styles from './ModelDetail.module.css';
import { useEffect } from 'react';

const modelInfo = {
    id: 1,
    name: 'model_name_1',
    api: `/api/models/news-classifier/model_name_1`,
    created_at: '2023 / 11 / 21',
    deployed_at: '2023 / 11 / 21',
    dataLength: 1200,
    epochs: 14,
    batchSize: 5,
    maxLength: 8,
    warmupRatio: 512,
    maxGradNorm: 1,
    learningRate: '5e-5',
    splitRate: 200,
    accuracy: 82.138,
    improvement: 3.103,
    loss: 19.053,
};

function ModelDetail() {
    const { modelId } = useParams();

    useEffect(() => {}, []);

    return (
        <PageTemplate>
            <HeaderTemplate>{modelInfo.name} 상세 정보</HeaderTemplate>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tr>
                            <td className={styles.label}>API</td>
                            <td colSpan={8} className={styles.data}>
                                {modelInfo.api}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>학습 모델</td>
                            <td colSpan={8} className={styles.data}>
                                KoBERT (BERT BASE)
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>정확도</td>
                            <td colSpan={4} className={styles.data}>
                                {modelInfo.accuracy}
                            </td>
                            <td colSpan={2} className={styles.label}>
                                이전 최고 성능 대비
                            </td>
                            <td colSpan={2} className={styles.data}>
                                {modelInfo.improvement} %
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>파라미터</td>
                            <td colSpan={2} className={styles.data}>
                                [EPOCHS]
                            </td>
                            <td className={styles.data}>{modelInfo.accuracy}</td>
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [MAX GRAD NORM]
                            </td>
                            <td className={styles.data}>{modelInfo.maxGradNorm}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [BATCH SIZE]
                            </td>
                            <td className={styles.data}>{modelInfo.batchSize}</td>
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [LEARNING RATE]
                            </td>
                            <td className={styles.data}>{modelInfo.learningRate}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [MAX LENGTH]
                            </td>
                            <td className={styles.data}>{modelInfo.maxLength}</td>
                            <td></td>
                            <td colSpan={2} className={styles.data}>
                                [SPLIT RATE]
                            </td>
                            <td className={styles.data}>{modelInfo.splitRate}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}></td>
                            <td colSpan={2} className={styles.data}>
                                [WARMUP RATIO]
                            </td>
                            <td className={styles.data}>{modelInfo.warmupRatio}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>최근 배포 일시</td>
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
                            <td className={styles.label}>데이터 수</td>
                            <td colSpan={8} className={styles.data}>
                                {modelInfo.dataLength}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>학습 과정 및 결과</td>
                        </tr>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                        <p>CHART</p>
                    </table>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default ModelDetail;

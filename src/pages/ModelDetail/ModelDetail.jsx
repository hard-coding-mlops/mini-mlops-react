import { useParams } from 'react-router-dom';

import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';

import styles from './ModelDetail.module.css';
import { useEffect } from 'react';

const modelInfo = {
  id: 1,
  name: 'model_name_1',
  api: `/api/models/news-classifier/model_name_1`,
  datetime: '2023 / 11 / 21',
  parameters: {
    dataLength: 1200,
    epochs: 14,
    batchSize: 5,
    maxLength: 8,
    warmupRatio: 512,
    maxGradNorm: 1,
    logInterval: 200,
    learningRate: '5e-5',
  },
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
              <td className={styles.data}>{modelInfo.parameters.maxGradNorm}</td>
            </tr>
            <tr>
              <td className={styles.label}></td>
              <td colSpan={2} className={styles.data}>
                [BATCH SIZE]
              </td>
              <td className={styles.data}>{modelInfo.parameters.batchSize}</td>
              <td></td>
              <td colSpan={2} className={styles.data}>
                [logInterval]
              </td>
              <td className={styles.data}>{modelInfo.parameters.logInterval}</td>
            </tr>
            <tr>
              <td className={styles.label}></td>
              <td colSpan={2} className={styles.data}>
                [MAX LENGTH]
              </td>
              <td className={styles.data}>{modelInfo.parameters.maxLength}</td>
              <td></td>
              <td colSpan={2} className={styles.data}>
                [LEARNING RATE]
              </td>
              <td className={styles.data}>{modelInfo.parameters.learningRate}</td>
            </tr>
            <tr>
              <td className={styles.label}></td>
              <td colSpan={2} className={styles.data}>
                [WARMUP RATIO]
              </td>
              <td className={styles.data}>{modelInfo.parameters.warmupRatio}</td>
            </tr>
            <tr>
              <td className={styles.label}>최근 배포 일시</td>
              <td colSpan={8} className={styles.data}>
                {modelInfo.datetime}
              </td>
            </tr>
            <tr>
              <td className={styles.label}>데이터 수</td>
              <td colSpan={8} className={styles.data}>
                {modelInfo.parameters.dataLength}
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

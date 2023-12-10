import { useParams } from 'react-router-dom';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';

import styles from './ModelDetail.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

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
  const [modelInfo, setModelInfo] = useState({});
  const [graph, setGraph] = useState({});
  const [epochs, setEpochs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getModelInfo = async () => {
    setIsLoading(true);
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/model/${modelId}`, {
      headers: {
        'ngrok-skip-browser-warning': 'any-value',
      },
    });
    console.log(result.data);
    setModelInfo(result.data.model);

    const { acc_graph, loss_graph, confusion_graph } = result.data.graph;
    setGraph({ acc_graph, loss_graph, confusion_graph });

    const extractedEpochs = result.data.epoch.map(({ epoch_number, train_acc, train_loss, test_acc, test_loss }) => ({
      epoch_number,
      train_acc,
      train_loss,
      test_acc,
      test_loss,
    }));
    setEpochs(extractedEpochs);
    setIsLoading(false);
  };

  useEffect(() => {
    getModelInfo();
  }, []);

  return (
    <PageTemplate>
      <HeaderTemplate>{modelInfo.model_name} 상세 정보</HeaderTemplate>
      {isLoading && <Loading message={'모델 가져오는 중'} />}
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
                {modelInfo.accuracy * 100} %
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
                <img src={`data:image/jpg;base64,${graph.acc_graph}`} alt='accuracy' className={styles.accLossGraphs} />
              )}
              {graph.loss_graph && (
                <img src={`data:image/jpg;base64,${graph.loss_graph}`} alt='loss' className={styles.accLossGraphs} />
              )}
            </div>
            {graph.confusion_graph && (
              <img
                src={`data:image/jpg;base64,${graph.confusion_graph}`}
                alt='confusion'
                className={styles.confusionGraph}
              />
            )}
          </div>
        </div>
      </BodyTemplate>
    </PageTemplate>
  );
}

export default ModelDetail;

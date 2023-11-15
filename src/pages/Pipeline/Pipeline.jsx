import { useState } from 'react';
import Curve from '../../components/Curve/Curve';
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle';
import styles from './Pipeline.module.css';
import PipelineHeader from './PipelineHeader';

function Pipeline() {
  const [scrapingProgress, setScrapingProgress] = useState(false);
  const [preprocessingProgress, setPreprocessingProgress] = useState(false);
  const [learningProgress, setLearningProgress] = useState(false);

  return (
    <div className={styles.pipeline}>
      <PipelineHeader />
      <div className={styles.timeline}>
        <ProgressCircle colorHexCode='#ff6b6b' coordinate={{ x: 480, y: 300 }} label='데이터 수집' labelPosition='d' />
        <button
          onClick={() => {
            setScrapingProgress(true);
          }}
        >
          STEP 1
        </button>
        <Curve startX={480} startY={300} endX={913} endY={850} colorHexCode='#ff6b6b' isFinished={scrapingProgress} />
        {/* <Curve startX={480} startY={300} endX={913} endY={850} colorHexCode='#cccccc' /> */}

        <ProgressCircle colorHexCode='#ffa500' coordinate={{ x: 913, y: 850 }} label='데이터 정제' labelPosition='u' />
        <button
          onClick={() => {
            setPreprocessingProgress(true);
          }}
        >
          STEP 2
        </button>

        <Curve
          startX={913}
          startY={850}
          endX={1347}
          endY={300}
          colorHexCode='#ffa500'
          isFinished={preprocessingProgress}
        />
        {/* <Curve startX={913} startY={850} endX={1347} endY={300} colorHexCode='#cccccc' /> */}

        <ProgressCircle colorHexCode='#3498db' coordinate={{ x: 1347, y: 300 }} label='모델 학습' labelPosition='d' />
        <button
          onClick={() => {
            setLearningProgress(true);
          }}
        >
          STEP 3
        </button>

        <Curve startX={1347} startY={300} endX={1780} endY={850} colorHexCode='#3498db' isFinished={learningProgress} />
        {/* <Curve startX={1347} startY={300} endX={1780} endY={850} colorHexCode='#cccccc' /> */}

        <ProgressCircle colorHexCode='#4caf50' coordinate={{ x: 1780, y: 850 }} label='모델 배포' labelPosition='u' />
      </div>
    </div>
  );
}

export default Pipeline;

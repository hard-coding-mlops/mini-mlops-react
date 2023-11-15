import { useState } from 'react';
import Curve from '../../components/Curve/Curve';
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle';
import styles from './Pipeline.module.css';
import PipelineHeader from './PipelineHeader';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Pipeline() {
  const [doneScraping, setDoneScraping] = useState(false);
  const [donePreprocessing, setDonePreprocessing] = useState(false);
  const [doneLearning, setDoneLearning] = useState(false);
  const [doneDeploying, setDoneDeploying] = useState(false);

  const [inScrapingProgress, setInScrapingProgress] = useState(false);
  const [inPreprocessingProgress, setInPreprocessingProgress] = useState(false);
  const [inLearningProgress, setInLearningProgress] = useState(false);
  const [inDeployingProgress, setInDeployingProgress] = useState(false);

  return (
    <div className={styles.pipeline}>
      <PipelineHeader />
      <div className={styles.timeline}>
        {!doneScraping && inScrapingProgress && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '275.5px', left: '455.5px' }} />
        )}
        <ProgressCircle
          colorHexCode={inScrapingProgress ? '#ff6b6b' : '#cccccc'}
          coordinate={{ x: 480, y: 300 }}
          label='데이터 수집'
          labelPosition='d'
        />
        <button
          onClick={() => {
            setInScrapingProgress(true);
          }}
        >
          데이터 수집하기!
        </button>
        <br />
        <br />
        <Curve startX={480} startY={300} endX={913} endY={850} colorHexCode='#ff6b6b' isFinished={doneScraping} />

        {!donePreprocessing && inPreprocessingProgress && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '825.5px', left: '888.5px' }} />
        )}
        <ProgressCircle
          colorHexCode={inPreprocessingProgress ? '#ffa500' : '#cccccc'}
          coordinate={{ x: 913, y: 850 }}
          label='데이터 정제'
          labelPosition='u'
        />
        <button
          onClick={() => {
            setDoneScraping(true);
            setInPreprocessingProgress(true);
          }}
        >
          데이터 정제하기!
        </button>
        <br />
        <br />

        <Curve startX={913} startY={850} endX={1347} endY={300} colorHexCode='#ffa500' isFinished={donePreprocessing} />

        {!doneLearning && inLearningProgress && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '275.5px', left: '1322.5px' }} />
        )}
        <ProgressCircle
          colorHexCode={inLearningProgress ? '#3498db' : '#cccccc'}
          coordinate={{ x: 1347, y: 300 }}
          label='모델 학습'
          labelPosition='d'
        />
        <button
          onClick={() => {
            setDonePreprocessing(true);
            setInLearningProgress(true);
          }}
        >
          모델 학습하기!
        </button>
        <br />
        <br />

        <Curve startX={1347} startY={300} endX={1780} endY={850} colorHexCode='#3498db' isFinished={doneLearning} />

        {!doneDeploying && inDeployingProgress && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '825.5px', left: '1755.5px' }} />
        )}
        <ProgressCircle
          colorHexCode={inDeployingProgress ? '#4caf50' : '#cccccc'}
          coordinate={{ x: 1780, y: 850 }}
          label='모델 배포'
          labelPosition='u'
        />
        <button
          onClick={() => {
            setDoneLearning(true);
            setInDeployingProgress(true);
          }}
        >
          모델 배포하기!
        </button>
        <br />
        <br />

        <button
          onClick={() => {
            setDoneDeploying(true);
          }}
        >
          완료!
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Pipeline;

import { useState } from 'react';
import axios from 'axios';

import Curve from '../../components/Curve/Curve';
import ProcessCircle from '../../components/ProcessCircle/ProcessCircle';
import styles from './Pipeline.module.css';
import PipelineHeader from './PipelineHeader';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Pipeline() {
  const [currentProcess, setCurrentProcess] = useState(0);

  const [inScrapingProcess, setInScrapingProcess] = useState(false);
  const [inPreprocessingProcess, setInPreprocessingProcess] = useState(false);
  const [inLearningProcess, setInLearningProcess] = useState(false);
  const [inDeployingProcess, setInDeployingProcess] = useState(false);

  const [doneScraping, setDoneScraping] = useState(false);
  const [donePreprocessing, setDonePreprocessing] = useState(false);
  const [doneLearning, setDoneLearning] = useState(false);
  const [doneDeploying, setDoneDeploying] = useState(false);

  const handleScrapeButtonClick = async () => {
    setCurrentProcess(1);
    setInScrapingProcess(true);
    // const result = await axios.get(process.env.REACT_APP_SERVER_URL + '/scraper/scrape');
    // console.log(result.data);
    setDoneScraping(true);
  };
  const handlePreprocessingButtonClick = async () => {
    setCurrentProcess(2);
    setInPreprocessingProcess(true);
    const result = await axios.get(process.env.REACT_APP_SERVER_URL + '');
    console.log(result.data);
    setDonePreprocessing(true);
  };
  const handleLearningButtonClick = async () => {
    setCurrentProcess(3);
    setInLearningProcess(true);
    const result = await axios.get(process.env.REACT_APP_SERVER_URL + '');
    console.log(result.data);
    setDoneLearning(true);
  };
  const handleDeployingButtonClick = async () => {
    setCurrentProcess(4);
    setInDeployingProcess(true);
    const result = await axios.get(process.env.REACT_APP_SERVER_URL + '');
    console.log(result.data);
    setDoneDeploying(true);
  };

  return (
    <div className={styles.pipeline}>
      <PipelineHeader currentProcess={currentProcess} />
      <div className={styles.timeline}>
        {!doneScraping && inScrapingProcess && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '275.5px', left: '455.5px' }} />
        )}
        <ProcessCircle
          colorHexCode={inScrapingProcess ? '#ff6b6b' : '#cccccc'}
          coordinate={{ x: 480, y: 300 }}
          label='데이터 수집'
          labelPosition='d'
        />
        <button onClick={handleScrapeButtonClick}>데이터 수집하기!</button>
        <br />
        <br />
        <Curve startX={480} startY={300} endX={913} endY={850} colorHexCode='#ff6b6b' isFinished={doneScraping} />

        {!donePreprocessing && inPreprocessingProcess && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '825.5px', left: '888.5px' }} />
        )}
        <ProcessCircle
          colorHexCode={inPreprocessingProcess ? '#ffa500' : '#cccccc'}
          coordinate={{ x: 913, y: 850 }}
          label='데이터 정제'
          labelPosition='u'
        />
        <button
          onClick={
            doneScraping
              ? handlePreprocessingButtonClick
              : () => {
                  alert('데이터 수집을 먼저 해주세요!');
                }
          }
        >
          데이터 정제하기!
        </button>
        <br />
        <br />

        <Curve startX={913} startY={850} endX={1347} endY={300} colorHexCode='#ffa500' isFinished={donePreprocessing} />

        {!doneLearning && inLearningProcess && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '275.5px', left: '1322.5px' }} />
        )}
        <ProcessCircle
          colorHexCode={inLearningProcess ? '#3498db' : '#cccccc'}
          coordinate={{ x: 1347, y: 300 }}
          label='모델 학습'
          labelPosition='d'
        />
        <button
          onClick={
            donePreprocessing
              ? handleLearningButtonClick
              : () => {
                  alert('데이터 정제를 먼저 해주세요!');
                }
          }
        >
          모델 학습하기!
        </button>
        <br />
        <br />

        <Curve startX={1347} startY={300} endX={1780} endY={850} colorHexCode='#3498db' isFinished={doneLearning} />

        {!doneDeploying && inDeployingProcess && (
          <LoadingSpinner spinnerStyle={{ position: 'absolute', top: '825.5px', left: '1755.5px' }} />
        )}
        <ProcessCircle
          colorHexCode={inDeployingProcess ? '#4caf50' : '#cccccc'}
          coordinate={{ x: 1780, y: 850 }}
          label='모델 배포'
          labelPosition='u'
        />
        <button
          onClick={
            doneLearning
              ? handleDeployingButtonClick
              : () => {
                  alert('모델 학습을 먼저 해주세요!');
                }
          }
        >
          모델 배포하기!
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            doneLearning ? setCurrentProcess(5) : alert('모델 학습을 먼저 해주세요!');
          }}
        >
          FIN!
        </button>
      </div>
    </div>
  );
}

export default Pipeline;

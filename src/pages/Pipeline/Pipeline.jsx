import Curve from '../../components/Curve/Curve';
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle';
import styles from './Pipeline.module.css';
import PipelineHeader from './PipelineHeader';

function Pipeline() {
  return (
    <div className={styles.pipeline}>
      <PipelineHeader />
      <div className={styles.timeline}>
        <ProgressCircle colorHexCode='#ff6b6b' coordinate={{ x: 480, y: 300 }} label='데이터 수집' labelPosition='d' />

        <Curve startX={480} startY={300} endX={696.5} endY={575} colorHexCode='#ff6b6b' />
        <Curve startX={913} startY={850} endX={696.5} endY={575} colorHexCode='#ff6b6b' />

        <ProgressCircle colorHexCode='#ffa500' coordinate={{ x: 913, y: 850 }} label='데이터 정제' labelPosition='u' />

        <Curve startX={913} startY={850} endX={1129.5} endY={575} colorHexCode='#ffa500' />
        <Curve startX={1347} startY={300} endX={1129.5} endY={575} colorHexCode='#ffa500' />

        <ProgressCircle colorHexCode='#3498db' coordinate={{ x: 1347, y: 300 }} label='모델 학습' labelPosition='d' />

        <Curve startX={1347} startY={300} endX={1563.5} endY={575} colorHexCode='#3498db' />
        <Curve startX={1780} startY={850} endX={1563.5} endY={575} colorHexCode='#3498db' />

        <ProgressCircle colorHexCode='#4caf50' coordinate={{ x: 1780, y: 850 }} label='모델 배포' labelPosition='u' />
      </div>
    </div>
  );
}

export default Pipeline;

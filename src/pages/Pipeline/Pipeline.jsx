import Curve from '../../components/Curve/Curve';
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle';
import styles from './Pipeline.module.css';
import PipelineHeader from './PipelineHeader';

function Pipeline() {
  return (
    <div className={styles.pipeline}>
      <PipelineHeader />
      <div className={styles.timeline}>
        {/* 
          너비 1660px 화면에 점 4개를 균등하게 배치하려면 각 점의 x좌표는 553, 1106, 1659가 됩니다.
        */}
        <ProgressCircle colorHexCode='#ff6b6b' coordinate={{ x: 480, y: 300 }} />
        <span>데이터 수집</span>
        <Curve startX={480} startY={300} endX={696.5} endY={575} colorHexCode='#ff6b6b' />
        <Curve startX={913} startY={850} endX={696.5} endY={575} colorHexCode='#ff6b6b' />
        <ProgressCircle colorHexCode='#ffa500' coordinate={{ x: 913, y: 850 }} />
        <span>데이터 정제</span>
        <Curve startX={913} startY={850} endX={1129.5} endY={575} colorHexCode='#ffa500' />
        <Curve startX={1347} startY={300} endX={1129.5} endY={575} colorHexCode='#ffa500' />
        <ProgressCircle colorHexCode='#3498db' coordinate={{ x: 1347, y: 300 }} />
        <span>모델 학습</span>
        <Curve startX={1347} startY={300} endX={1563.5} endY={575} colorHexCode='#3498db' />
        <Curve startX={1780} startY={850} endX={1563.5} endY={575} colorHexCode='#3498db' />
        <ProgressCircle colorHexCode='#4caf50' coordinate={{ x: 1780, y: 850 }} />
        <span>모델 배포</span>
      </div>
    </div>
  );
}

export default Pipeline;

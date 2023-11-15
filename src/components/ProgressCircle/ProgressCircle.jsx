import styles from './ProgressCircle.module.css';

function ProgressCircle({ colorHexCode, coordinate, label, labelPosition }) {
  // coordinate가 정의되지 않았거나 x, y 속성이 없는 경우를 방지하기 위해 기본값을 설정합니다.
  const { x = 0, y = 0 } = coordinate || {};

  const labelStyle = {
    color: colorHexCode,
    left: `${x - 85}px`,
    top: `${labelPosition === 'u' && labelPosition !== 'd' ? y - 50 : y + 50}px`,
  };

  return (
    <>
      <div className={styles.progress} style={{ backgroundColor: colorHexCode, left: `${x}px`, top: `${y}px` }}></div>
      <span className={styles.progressLabel} style={{ ...labelStyle }}>
        {label}
      </span>
    </>
  );
}

export default ProgressCircle;

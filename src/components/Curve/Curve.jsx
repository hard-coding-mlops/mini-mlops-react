import styles from './Curve.module.css';

function Curve({ colorHexCode, startX, startY, endX, endY, isFinished = false }) {
  const middlePoint = { x: (endX + startX) / 2, y: (endY + startY) / 2 };
  const firstControlPoint = { x: middlePoint.x, y: startY };
  const secondControlPoint = { x: middlePoint.x, y: endY };

  const pathData = `M ${startX} ${startY} C ${startX} ${startY}, ${firstControlPoint.x} ${firstControlPoint.y}, ${middlePoint.x} ${middlePoint.y} C ${middlePoint.x} ${middlePoint.y}, ${secondControlPoint.x} ${secondControlPoint.y}, ${endX} ${endY}`;

  return (
    <svg width='1960' height='1080' style={{ position: 'absolute', zIndex: -1, top: '15px', left: '15px' }}>
      <path d={pathData} fill='none' stroke='#cccccc' strokeWidth='2px' />
      <path
        className={isFinished ? styles.colorLine : ''}
        d={pathData}
        fill='none'
        stroke={isFinished ? colorHexCode : '#cccccc'}
        strokeWidth='2px'
      />
    </svg>
  );
}

export default Curve;

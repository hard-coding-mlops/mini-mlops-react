import { useEffect, useRef } from 'react';
import styles from './Curve.module.css';

function Curve({ colorHexCode, startX, startY, endX, endY, isFinished = false }) {
  const pathData = `M ${startX}, ${startY} C ${endX}, ${startY} ${startX}, ${endY} ${endX}, ${endY}`;
  const pathRef = useRef(null);

  useEffect(() => {
    const pathElement = pathRef.current;
    const pathLength = pathElement.getTotalLength();
    console.log('Path Length:', pathLength);
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  return (
    <svg width='1960' height='1080' style={{ position: 'absolute', zIndex: -1, top: '15px', left: '15px' }}>
      <path ref={pathRef} d={pathData} fill='none' stroke='#cccccc' strokeWidth='2px' />
      <path
        className={isFinished ? styles.colorLine : ''}
        ref={pathRef}
        d={pathData}
        fill='none'
        stroke={isFinished ? colorHexCode : '#cccccc'}
        strokeWidth='2px'
      />
    </svg>
  );
}

export default Curve;

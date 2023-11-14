function Curve({ colorHexCode, startX, startY, endX, endY }) {
  const startPoint = { x: startX, y: startY };
  const endPoint = { x: endX, y: endY };
  const controlPoint = { x: endX, y: startY };

  const pathData = `M${startPoint.x},${startPoint.y} Q${controlPoint.x},${controlPoint.y} ${endPoint.x},${endPoint.y}`;

  return (
    <svg width='1960' height='1080' style={{ position: 'absolute', zIndex: -1, top: '15px', left: '15px' }}>
      {/* 점 */}
      <circle cx={startPoint.x} cy={startPoint.y} r='0' fill='black' />
      <circle cx={endPoint.x} cy={endPoint.y} r='0' fill='black' />

      {/* 선 */}
      <path d={pathData} fill='none' stroke={colorHexCode} strokeWidth='2px' />
    </svg>
  );
}
export default Curve;

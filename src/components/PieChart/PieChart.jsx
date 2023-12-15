import { ResponsivePie } from '@nivo/pie';
import SlotCounter from 'react-slot-counter';

import styles from './PieChart.module.css';

function PieChart({ label, value, color, backwards }) {
    const transparentValue = (100 - value).toFixed(3);
    console.log(typeof value);

    return (
        <div className={styles.pieChartContainer}>
            {typeof value !== 'number' ? (
                <>
                    <ResponsivePie
                        data={[
                            { id: '정답', value: value[0] },
                            { id: '무응답', value: value[1] },
                            { id: '오답', value: value[2] },
                        ]}
                        margin={{ top: 30, right: 10, bottom: 30, left: 10 }}
                        colors={['#3498DB', '#FFA500', '#FF6B6B', '#4CAF50']}
                        startAngle={360}
                        endAngle={0}
                        innerRadius={0.6}
                        padAngle={0.6}
                        cornerRadius={10}
                        activeOuterRadiusOffset={8}
                        borderWidth={3}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        // enableArcLinkLabels={false}
                        // enableArcLabels={false}
                        // arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor={{ from: 'color' }}
                        arcLinkLabelsThickness={3}
                        arcLinkLabelsColor={{ from: 'color' }}
                        // arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            // modifiers: [['darker', 2]],
                        }}
                    />
                    <div className={styles.satisfiedValue}>
                        <SlotCounter value={value[0] * 1} duration={1} dummyCharacterCount={7} />
                        👍
                    </div>
                </>
            ) : (
                <>
                    <ResponsivePie
                        data={[
                            { id: label, value: value },
                            { id: '', value: transparentValue },
                        ]}
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        colors={[color, 'transparent']}
                        startAngle={backwards ? 0 : 360}
                        endAngle={backwards ? 360 : 0}
                        innerRadius={0.6}
                        padAngle={0.6}
                        cornerRadius={10}
                        activeOuterRadiusOffset={8}
                        borderWidth={3}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        enableArcLinkLabels={false}
                        enableArcLabels={false}
                    />
                    <span className={styles.value}>
                        <SlotCounter value={value} duration={1} dummyCharacterCount={10} />%
                    </span>
                </>
            )}
        </div>
    );
}

export default PieChart;

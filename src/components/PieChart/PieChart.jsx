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
                            { id: '잘함', value: value[0] },
                            { id: '무응답', value: value[1] },
                            { id: '틀림', value: value[2] },
                        ]}
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        colors={['#3498DB', '#FFA500', '#FF6B6B']}
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
                        enableArcLinkLabels={false}
                        enableArcLabels={false}
                    />
                    <div className={styles.satisfiedValue}>
                        <SlotCounter value={value[0]} duration={1} dummyCharacterCount={7} />
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

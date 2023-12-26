import { useEffect, useState } from 'react';
import axios from 'axios';
import SlotCounter from 'react-slot-counter';
import { Skeleton } from '@mui/material';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import PieChartComponent from '../../components/ChartComponent/PieChartComponent';
import PieChartTwoElements from '../../components/ChartComponent/PieChartTwoElements';
import LossPieChart from '../../components/ChartComponent/LossPieChart';
import LineChartComponent from '../../components/ChartComponent/LineChartComponent';
import INCREASED_ICON from '../../assets/icons/increased-icon.svg';
import DECREASED_ICON from '../../assets/icons/decreased-icon.svg';

import styles from './DashBoard.module.css';
import EmptyPieChartComponent from '../../components/ChartComponent/EmptyPieChartComponent';

function DashBoard() {
    const [currentModel, setCurrentModel] = useState({});
    const [topFive, setTopFive] = useState([]);
    const [bestModel, setBestModel] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [accDiff, setAccDiff] = useState(0);
    const [lossDiff, setLossDiff] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);

    const getCurrentModel = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_COLAB_SERVER_URL}/model/currently-active`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        const { model_name, usage, acc, loss, evaluation_diff, evaluation_equal, evaluation_noresponse } = result.data;
        console.log('[CURRENT MODEL]', {
            model_name,
            usage,
            acc,
            loss,
            evaluation_diff,
            evaluation_equal,
            evaluation_noresponse,
        });
        setCurrentModel({
            model_name,
            usage,
            acc: acc,
            loss,
            evaluation_diff,
            evaluation_equal,
            evaluation_noresponse,
        });
        // setCurrentModel(current_model);
        setIsLoading(false);
    };
    const getTopFive = async () => {
        // setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/top-five`);
        console.log('[TOP FIVE]', result.data.data);
        // setTopFive([d, ...topFive]);
        const formattedData = result.data.data.map((d) => {
            return {
                ...d,
                accuracy: (d.accuracy * 100).toFixed(2),
                loss: d.loss.toFixed(2),
            };
        });
        setBestModel(formattedData[0]);
        setTopFive(formattedData);
    };

    useEffect(() => {
        localStorage.setItem('previousPath', '/dashboard');
        const token = localStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }, []);

    const fetchData = async () => {
        await getCurrentModel();
        await getTopFive();
        // 여기에서 currentModel과 bestModel의 값이 업데이트된 후에 비교하도록 수정
        setAccDiff(Math.abs(currentModel.acc * 100 - bestModel.accuracy).toFixed(2));
        setLossDiff(Math.abs(currentModel.loss - bestModel.loss).toFixed(2));
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PageTemplate>
            {/* {isLoading || !loggedIn  && <Loading message={'현재 모델을 가져오는 중입니다.'} />} */}
            <HeaderTemplate title='DASHBOARD' routes='dashboard' model={currentModel.model_name} />
            <BodyTemplate>
                {isLoading || !loggedIn ? (
                    <>
                        <Skeleton variant='rounded' width={'100%'} height={400} />
                    </>
                ) : (
                    <div className={styles.containerTitle}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    paddingBottom: '0.5rem',
                                }}
                            >
                                <span>{currentModel.model_name}</span>
                            </div>
                            <div style={{ width: 'calc(135px - 1rem)' }}></div>
                            <div style={{ width: 'calc(135px - 1rem)' }}></div>
                            <div style={{ width: 'calc(135px - 1rem)' }}></div>
                            <div style={{ width: 'calc(135px - 1rem)' }}></div>
                            <div style={{ width: 'calc(135px - 1rem)' }}></div>
                        </div>
                        {/* <hr style={{ width: '95%', height: '1px', backgroundColor: 'black', border: 'none' }} /> */}
                        <svg height='1' width='100%'>
                            <line x1='2%' y1='0' x2='98%' y2='0' style={{ stroke: '#c4c4c4', strokeWidth: '1' }} />
                        </svg>
                        <div className={styles.pieChartContainer}>
                            <br />
                            <div>
                                <span className={styles.chartTitle}>사용 횟수</span>
                                <div
                                    style={{
                                        width: '300px',
                                        height: '270px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '3rem',
                                        fontWeight: 'bold',
                                        color: '#4A4A4A',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <SlotCounter
                                            value={currentModel.usage ? currentModel.usage * 1 : 0}
                                            duration={1}
                                            dummyCharacterCount={7}
                                        />
                                        <span style={{ color: '#7A7A7A', fontSize: '1.3rem', fontWeight: '600' }}>
                                            회
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* <svg height='200' width='1'>
                            <line x1='0' y1='0' x2='0' y2='300' style={{ stroke: '#c4c4c4', strokeWidth: '1' }} />
                        </svg> */}
                            <div>
                                <span className={styles.chartTitle}>사용자 만족도</span>
                                {currentModel.evaluation_noresponse === 0 ? (
                                    <EmptyPieChartComponent />
                                ) : (
                                    <PieChartComponent
                                        data={[
                                            { name: '만족', value: currentModel.evaluation_equal },
                                            { name: '무응답', value: currentModel.evaluation_noresponse },
                                            { name: '불만족', value: currentModel.evaluation_diff },
                                        ]}
                                    />
                                )}
                            </div>
                            <br />
                            <div>
                                <span className={styles.chartTitle}>정확도</span>
                                <PieChartTwoElements
                                    data={[
                                        {
                                            name: `${
                                                // 소수점 버림
                                                Math.round(currentModel.acc * 100)
                                            } %`,
                                            value: currentModel.acc,
                                        },
                                        { name: '-', value: 1 - currentModel.acc },
                                    ]}
                                />
                            </div>
                            <br />
                            <div>
                                <span className={styles.chartTitle}>손실도</span>
                                <LossPieChart
                                    data={[
                                        {
                                            name: `${
                                                // 소수점 버림
                                                parseFloat(currentModel.loss).toFixed(3)
                                            }`,
                                            value: parseFloat(currentModel.loss).toFixed(3) * 1,
                                        },
                                        { name: '-', value: 5 - currentModel.loss },
                                    ]}
                                />
                            </div>
                            <br />
                        </div>
                    </div>
                )}
                <br />
                <br />
                <br />

                {isLoading || !loggedIn ? (
                    <Skeleton variant='rounded' width={'100%'} height={400} />
                ) : (
                    <div className={styles.bottomContainer}>
                        <div className={styles.lineChartContainer}>
                            <span className={styles.chartTitle}>BEST 5 MODELS</span>
                            <br />
                            <LineChartComponent width={800} height={400} data={topFive} />
                        </div>
                        <svg height='200' width='1'>
                            <line x1='0' y1='0' x2='0' y2='300' style={{ stroke: '#c4c4c4', strokeWidth: '1' }} />
                        </svg>
                        <div>
                            <span className={styles.chartTitle}>최고 성능 대비</span>
                            <div
                                style={{
                                    width: '400px',
                                    height: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    fontWeight: 'bold',
                                    color: '#4A4A4A',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.3rem' }}>정확도&nbsp;</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {bestModel.accuracy < currentModel.acc ? (
                                            <img src={INCREASED_ICON} alt='increased' width='25' />
                                        ) : (
                                            <img src={DECREASED_ICON} alt='decreased' width='25' />
                                        )}
                                        &nbsp;
                                        <SlotCounter
                                            value={Number.isNaN(Number(accDiff)) ? 0 : Number(accDiff)}
                                            duration={1}
                                            dummyCharacterCount={7}
                                        />
                                        <span style={{ color: '#7A7A7A', fontSize: '1.3rem', fontWeight: '600' }}>
                                            %
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.3rem' }}>손실도&nbsp;</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {bestModel.loss < currentModel.loss ? (
                                            <img src={DECREASED_ICON} alt='decreased' width='25' />
                                        ) : (
                                            <img src={INCREASED_ICON} alt='increased' width='25' />
                                        )}
                                        &nbsp;
                                        <SlotCounter
                                            value={Number.isNaN(Number(lossDiff)) ? 0 : Number(lossDiff)}
                                            duration={1}
                                            dummyCharacterCount={7}
                                        />
                                        {/* <span style={{ color: '#7A7A7A', fontSize: '1.3rem', fontWeight: '600' }}>%</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </BodyTemplate>
        </PageTemplate>
    );
}

export default DashBoard;

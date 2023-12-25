import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { setLearnProgress } from '../../actions/sidebarActions';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import Icon from '../../components/Icon/Icon';
import MessageModal from '../../components/MessageModal/MessageModal';
import DecisionButtons from '../../components/MessageModal/DecisionButtons';

import styles from './NewModel.module.css';

let errorMessageTimeout;

function NewModel() {
    const dispatch = useDispatch();
    // const learnProgress = useSelector((state) => state.sidebar.learnProgress);

    const navigate = useNavigate();
    const nameRef = useRef(null);
    const epochsRef = useRef(null);
    const maxGradNormRef = useRef(null);
    const batchSizeRef = useRef(null);
    const learningRateRef = useRef(null);
    const maxLengthRef = useRef(null);
    const splitRateRef = useRef(null);
    const warmupRatioRef = useRef(null);
    const dataLengthRef = useRef(15);

    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const date = todayDate.getDate();
    const dateString = `${year}${month}${date}`;

    const [errorMessage, setErrorMessage] = useState('');
    // const [inputValidation, setInputValidation] = useState(false);
    const [backModal, setBackModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [isLearning, setIsLearning] = useState(false);
    const [isLearnCompleted, setIsLearnCompleted] = useState(false);
    const [accuracy, setAccuracy] = useState(0.0);
    const [loss, setLoss] = useState(0.0);

    const fetchLearningSSE = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_COLAB_SERVER_URL}/model/learn-progress`, {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model_filename: nameRef.current.value,
                    max_len: maxLengthRef.current.value,
                    batch_size: batchSizeRef.current.value,
                    num_epochs: epochsRef.current.value,
                    warmup_ratio: warmupRatioRef.current.value,
                    max_grad_norm: maxGradNormRef.current.value,
                    learning_rate: learningRateRef.current.value,
                    split_rate: splitRateRef.current.value,
                    data_length: dataLengthRef.current.value,
                }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const readChunk = async () => {
                const result = await reader.read();
                await appendChunks(result);
            };

            const appendChunks = async (result) => {
                const chunk = decoder.decode(result.value || new Uint8Array(), {
                    stream: !result.done,
                });
                const jsonChunks = chunk.split('\n').filter(Boolean);

                for (const jsonChunk of jsonChunks) {
                    const trimmedChunk = jsonChunk.replace(/^data: /, ''); // "data: " 제거
                    try {
                        const parsedData = JSON.parse(trimmedChunk);
                        console.log(`${parsedData.kind}, ${parsedData.progress}%`);
                        toast.success(`${parsedData.kind}`);
                        dispatch(setLearnProgress(parsedData.progress));
                        // toast.success(parsedData.kind);
                    } catch (error) {
                        console.error('JSON 파싱 중 오류 발생:', error);
                    }
                }

                if (!result.done) {
                    await readChunk();
                }
            };

            await readChunk();
            toast.success('모델 학습이 완료되었습니다');
        } catch (error) {
            // toast.error(error.message);
            toast.error('[ERROR] 콘솔 확인');
            console.log(error);
        }
    };

    return (
        <PageTemplate>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'모델 학습'} routes={'model / add'} />
                <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Icon
                        label='save'
                        handleOnClick={() => {
                            setSaveModal(true);
                        }}
                    />
                    <Icon
                        label='back'
                        handleOnClick={() => {
                            navigate('/model');
                        }}
                    />
                </div>
            </div>
            {/* <HeaderTemplate>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>모델 생성</span>
                    {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
                    <div style={{ display: 'flex' }}>
                        <Icon
                            label='save'
                            handleOnClick={() => {
                                if (!nameRef.current.value) {
                                    setErrorMessage('(파일)이름을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!epochsRef.current.value) {
                                    setErrorMessage('num_of_epochs 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!maxGradNormRef.current.value) {
                                    setErrorMessage('max_grad_norm 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!batchSizeRef.current.value) {
                                    setErrorMessage('batch_size 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!learningRateRef.current.value) {
                                    setErrorMessage('learning_rate 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!maxLengthRef.current.value) {
                                    setErrorMessage('max_length 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!splitRateRef.current.value) {
                                    setErrorMessage('split_rate 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!warmupRatioRef.current.value) {
                                    setErrorMessage('warmup_ratio 값을 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else if (!dataLengthRef.current.value) {
                                    setErrorMessage('데이터 수를 다시 확인해주세요.');
                                    // setInputValidation(false);
                                } else {
                                    setSaveModal(true);
                                }
                                clearTimeout(errorMessageTimeout);
                                errorMessageTimeout = setTimeout(() => {
                                    setErrorMessage('');
                                }, 3000);
                            }}
                        />
                        <Icon
                            label='back'
                            handleOnClick={() => {
                                setBackModal(true);
                            }}
                        />
                    </div>
                </div>
            </HeaderTemplate> */}
            <BodyTemplate>
                {saveModal && (
                    <MessageModal onClose={() => setBackModal(false)}>
                        <span className={styles.modalQuestion}>
                            {isLearnCompleted
                                ? '다음과 같이 학습이 완료되었습니다.'
                                : isLearning
                                ? '모델 학습 중입니다.'
                                : '다음과 같이 모델을 학습시키겠습니까?'}
                        </span>
                        <table>
                            {isLearnCompleted ? (
                                <tbody>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>정확도</td>
                                        <td className={styles.modalParameter}>{accuracy}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>손실도</td>
                                        <td className={styles.modalParameter}>{loss}</td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>모델명</td>
                                        <td className={styles.modalParameter}>{nameRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>EPOCHS</td>
                                        <td className={styles.modalParameter}>{epochsRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>BATCH SIZE</td>
                                        <td className={styles.modalParameter}>{batchSizeRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>MAX LENGTH</td>
                                        <td className={styles.modalParameter}>{maxLengthRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>WARMUP RATIO</td>
                                        <td className={styles.modalParameter}>{warmupRatioRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>MAX GRAD NORM</td>
                                        <td className={styles.modalParameter}>{maxGradNormRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>LEARNING RATE</td>
                                        <td className={styles.modalParameter}>{learningRateRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>SPLIT RATE</td>
                                        <td className={styles.modalParameter}>{splitRateRef.current.value}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.modalParameterLabel}>DATA LENGTH</td>
                                        <td className={styles.modalParameter}>{dataLengthRef.current.value}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        {!isLearning && !isLearnCompleted && (
                            <DecisionButtons
                                handleYes={() => {
                                    fetchLearningSSE();
                                    navigate('/model');
                                }}
                                handleNo={() => setSaveModal(false)}
                            />
                        )}
                        {/* {isLearnCompleted && (
                            <button className={styles.buttons} onClick={learnCompleted}>
                                완료하기
                            </button>
                            // <DecisionButtons handleYes={learnCompleted} handleNo={() => setSaveModal(false)} />
                        )} */}
                    </MessageModal>
                )}
                {backModal && (
                    <MessageModal onClose={() => setBackModal(false)}>
                        <span className={styles.modalQuestion}>모델 생성 작업을 취소하시겠습니까?</span>
                        <DecisionButtons handleYes={() => navigate('/model')} handleNo={() => setBackModal(false)} />
                    </MessageModal>
                )}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td className={styles.label}>이름</td>
                                <td colSpan={5} className={styles.data}>
                                    <input
                                        ref={nameRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='model_filename'
                                        // defaultValue={`model_${dateString}`}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <br />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>학습 모델</td>
                                <td colSpan={8} className={styles.data}>
                                    KoBERT (BERT BASE)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <br />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>파라미터</td>
                                <td colSpan={2} className={styles.parameter}>
                                    [EPOCHS]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={epochsRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='num_of_epochs'
                                        defaultValue={5}
                                    />
                                </td>
                                {/* <td></td> */}
                                <td colSpan={2} className={styles.parameter}>
                                    [MAX GRAD NORM]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={maxGradNormRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='max_grad_norm'
                                        defaultValue={1}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}></td>
                                <td colSpan={2} className={styles.parameter}>
                                    [BATCH SIZE]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={batchSizeRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='batch_size'
                                        defaultValue={8}
                                    />
                                </td>
                                <td colSpan={2} className={styles.parameter}>
                                    [LEARNING RATE]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={learningRateRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='learning_rate'
                                        defaultValue={0.00005}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}></td>
                                <td colSpan={2} className={styles.parameter}>
                                    [MAX LENGTH]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={maxLengthRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='max_length'
                                        defaultValue={20}
                                    />
                                </td>
                                <td colSpan={2} className={styles.parameter}>
                                    [SPLIT RATE]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={splitRateRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='split_rate'
                                        defaultValue={0.3}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}></td>
                                <td colSpan={2} className={styles.parameter}>
                                    [WARMUP RATIO]
                                </td>
                                <td colSpan={3} className={styles.data}>
                                    <input
                                        ref={warmupRatioRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='warmup_ratio'
                                        defaultValue={0.1}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <br />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.label}>데이터 수</td>
                                <td colSpan={4} className={styles.data}>
                                    <input
                                        ref={dataLengthRef}
                                        className={styles.addInput}
                                        type='text'
                                        placeholder='data_length'
                                        defaultValue={15}
                                    />
                                    <span style={{ color: '#aaaaaa' }}>
                                        &nbsp;개,&nbsp;&nbsp;총 {dataLengthRef.current * 8}개
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default NewModel;

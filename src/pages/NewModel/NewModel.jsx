import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import Icon from '../../components/Icon/Icon';
import MessageModal from '../../components/MessageModal/MessageModal';
import DecisionButtons from '../../components/MessageModal/DecisionButtons';

import styles from './NewModel.module.css';

function NewModel() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const epochsRef = useRef();
  const maxGradNormRef = useRef();
  const batchSizeRef = useRef();
  const learningRateRef = useRef();
  const maxLengthRef = useRef();
  const splitRateRef = useRef();
  const warmupRatioRef = useRef();
  const dataLengthRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  // const [inputValidation, setInputValidation] = useState(false);
  const [backModal, setBackModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  const modelLearning = () => {
    // axios post /model/learn
    alert('모델 학습을 시작합니다.');
    navigate('/model');
  };

  return (
    <PageTemplate>
      <HeaderTemplate>
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
                setTimeout(() => {
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
      </HeaderTemplate>
      <BodyTemplate>
        {saveModal && (
          <MessageModal onClose={() => setBackModal(false)}>
            <span className={styles.modalQuestion}>다음과 같이 모델을 학습시키겠습니까?</span>
            <table>
              <tr>
                <td className={styles.modalParameterLabel}>모델명</td>
                <td className={styles.modalParameter}>{nameRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>MAX LENGTH</td>
                <td className={styles.modalParameter}>{maxLengthRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>BATCH SIZE</td>
                <td className={styles.modalParameter}>{batchSizeRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>LEARNING RATE</td>
                <td className={styles.modalParameter}>{learningRateRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>MAX GRAD NORM</td>
                <td className={styles.modalParameter}>{maxGradNormRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>EPOCHS</td>
                <td className={styles.modalParameter}>{epochsRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>SPLIT RATE</td>
                <td className={styles.modalParameter}>{splitRateRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>WARMUP RATIO</td>
                <td className={styles.modalParameter}>{warmupRatioRef.current.value}</td>
              </tr>
              <tr>
                <td className={styles.modalParameterLabel}>DATA LENGTH</td>
                <td className={styles.modalParameter}>{dataLengthRef.current.value}</td>
              </tr>
            </table>
            {/* <span className={styles.modalParameter}>MAX LENGTH &nbsp; {maxLengthRef.current.value}</span>
            <span className={styles.modalParameter}>BATCH SIZE &nbsp; {batchSizeRef.current.value}</span>
            <span className={styles.modalParameter}>LEARNING RATE &nbsp; {learningRateRef.current.value}</span>
            <span className={styles.modalParameter}>MAX GRAD NORM &nbsp; {maxGradNormRef.current.value}</span>
            <span className={styles.modalParameter}>EPOCHS &nbsp; {epochsRef.current.value}</span>
            <span className={styles.modalParameter}>SPLIT RATE &nbsp; {splitRateRef.current.value}</span>
            <span className={styles.modalParameter}>WARMUP RATIO &nbsp; {warmupRatioRef.current.value}</span>
            <span className={styles.modalParameter}>DATA LENGTH &nbsp; {dataLengthRef.current.value}</span>
            <span className={styles.alertMessage}>( 해당 작업은 멈출 수 없습니다 )</span> */}
            <DecisionButtons handleYes={modelLearning} handleNo={() => setSaveModal(false)} />
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
            <tr>
              <td className={styles.label}>이름</td>
              <td colSpan={5} className={styles.data}>
                <input ref={nameRef} className={styles.addInput} type='text' placeholder='model_filename' />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>학습 모델</td>
              <td colSpan={8} className={styles.data}>
                KoBERT (BERT BASE)
              </td>
            </tr>
            <tr>
              <td className={styles.label}>파라미터</td>
              <td colSpan={2} className={styles.parameter}>
                [EPOCHS]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={epochsRef} className={styles.addInput} type='text' placeholder='num_of_epochs' />
              </td>
              {/* <td></td> */}
              <td colSpan={2} className={styles.parameter}>
                [MAX GRAD NORM]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={maxGradNormRef} className={styles.addInput} type='text' placeholder='max_grad_norm' />
              </td>
            </tr>
            <tr>
              <td className={styles.label}></td>
              <td colSpan={2} className={styles.parameter}>
                [BATCH SIZE]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={batchSizeRef} className={styles.addInput} type='text' placeholder='batch_size' />
              </td>
              <td colSpan={2} className={styles.parameter}>
                [LEARNING RATE]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={learningRateRef} className={styles.addInput} type='text' placeholder='learning_rate' />
              </td>
            </tr>
            <tr>
              <td className={styles.label}></td>
              <td colSpan={2} className={styles.parameter}>
                [MAX LENGTH]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={maxLengthRef} className={styles.addInput} type='text' placeholder='max_length' />
              </td>
              <td colSpan={2} className={styles.parameter}>
                [SPLIT RATE]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={splitRateRef} className={styles.addInput} type='text' placeholder='split_rate' />
              </td>
            </tr>
            <tr>
              <td className={styles.label}></td>
              <td colSpan={2} className={styles.parameter}>
                [WARMUP RATIO]
              </td>
              <td colSpan={3} className={styles.data}>
                <input ref={warmupRatioRef} className={styles.addInput} type='text' placeholder='warmup_ratio' />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>데이터 수</td>
              <td colSpan={3} className={styles.data}>
                <input ref={dataLengthRef} className={styles.addInput} type='text' placeholder='data_length' />
                &nbsp;개
              </td>
            </tr>
          </table>
        </div>
      </BodyTemplate>
    </PageTemplate>
  );
}

export default NewModel;

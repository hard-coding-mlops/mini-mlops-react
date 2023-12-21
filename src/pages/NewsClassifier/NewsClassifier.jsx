import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './NewsClassifier.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';

import GOOD_ICON from '../../assets/icons/good-icon.svg';
import BAD_ICON from '../../assets/icons/bad-icon.svg';
import SEND_ICON from '../../assets/icons/send-icon.svg';

function NewsClassifier() {
    const navigate = useNavigate();
    const articleInputRef = useRef(null);
    const badFeedbackRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [category, setCategory] = useState('');
    const [firstTry, setFirstTry] = useState(true);
    const [clientID, setClientID] = useState('');
    const [inputBadFeedback, setInputBadFeedback] = useState(false);

    const defaultArticle = `한미 특수전 부대가 한반도 모처에서 연합특수작전 훈련을 실시하고 있다고 합동참모본부가 19일 밝혔습니다.

    훈련은 북한이 고체연료 대륙간탄도미사일(ICBM) 화성-18형을 발사한 전날 시작됐는데요.
    
    합참에 따르면 특수전학교 훈련장 등지에서 진행되는 이번 훈련에는 한미 특수전부대 요원들이 참여했습니다.
    
    한미는 이번 훈련에서 양측 특수전부대 간 전투사격, 핵심지역 내부 소탕전술 등 특수작전 전투기술을 공유하고 있으며, 상호운용성을 높이는 데 중점을 뒀습니다.
    
    합참이 공개한 훈련 영상을 보면 얼굴이 모자이크 처리된 요원들이 건물 내부를 침투해 사람 표적을 향해 사격했는데요.
    
    이런 훈련 방식으로 볼 때 한미가 김정은 북한 국무위원장 등 북한 수뇌부를 제거하는 이른바 참수작전에 대비한 훈련을 한 것 아니냐는 관측도 나옵니다.`;

    const classifyArticle = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/currently-active`);
            const { model_name, usage, acc, loss, evaluation_diff, evaluation_equal, evaluation_noresponse } =
                response.data;
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (model_name === 'TEST_SSE_1') throw new Error('Model is low accuracy');
            const article = articleInputRef.current.value;
            const result = await axios.post(
                `${process.env.REACT_APP_COLAB_SERVER_URL}/model/classify`,
                {
                    user_input: article,
                },
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'any-value',
                    },
                }
            );
            setCategory(result.data.result);
            setClientID(result.data.client_id);
        } catch (error) {
            setCategory('IT');
            // Handle the error here, you can log it or show a user-friendly message
            console.error('An error occurred while classifying the article:', error);
            // You might want to set an appropriate error state or display an error message to the user
        } finally {
            setIsLoading(false);
            setFirstTry(false);
        }
    };

    const goodFeedback = async () => {
        const response = await axios.post(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/evaluate`, {
            client_id: clientID,
            reinput: category,
        });
        console.log(response.data);
    };
    const badFeedback = async () => {
        const categories = ['사회', '정치', '경제', '국제', '문화', '예능', '스포츠', 'IT'];
        if (categories.includes(badFeedbackRef.current.value)) {
            const result = await axios.post(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/evaluate`, {
                client_id: clientID,
                reinput: badFeedbackRef.current.value,
            });
            console.log(result);
            if (result.status == 200) {
                setInputBadFeedback(false);
            }
        } else {
            alert('분류할 수 없는 카테고리입니다.');
        }
    };

    return (
        <div className={styles.newsClassifier}>
            <button className={styles.toAdmin} onClick={() => navigate('/login')}>
                관리자이신가요?
            </button>
            <span className={styles.modelName}>이 기사 어떤 기사야?</span>
            <div className={styles.container}>
                <textarea
                    ref={articleInputRef}
                    name='article-input'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? '' : '기사를 입력해주세요.'}
                    className={styles.articleInput}
                    cols='100'
                    rows='48'
                    defaultValue={defaultArticle}
                />
                <div className={styles.infoContainer}>
                    <div className={styles.answer}>
                        {category ? (
                            <div>
                                해당 기사는
                                <span
                                    style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        // textDecoration: 'underline',
                                    }}
                                >
                                    &nbsp;&nbsp;"&nbsp;{category}&nbsp;"&nbsp;&nbsp;
                                </span>
                                분야입니다.
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <br />
                    {isLoading ? (
                        <div
                            style={{
                                width: '12rem',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <LoadingSpinner />
                        </div>
                    ) : firstTry ? (
                        <button onClick={classifyArticle} className={styles.askModel}>
                            분류하기
                        </button>
                    ) : inputBadFeedback ? (
                        <div style={{ display: 'flex', width: '100%', height: '3rem' }}>
                            <input ref={badFeedbackRef} className={styles.badFeedbackInput} type='text' />
                            <button onClick={badFeedback} className={styles.badFeedbackButton}>
                                <img style={{ marginLeft: '1rem', height: '100%' }} src={SEND_ICON} alt='send' />
                            </button>
                        </div>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={classifyArticle} className={styles.askModel}>
                                다시하기
                            </button>
                            <div className={styles.feedbackContainer}>
                                <button onClick={goodFeedback} className={styles.feedback}>
                                    <img style={{ width: '2.5rem', height: '100%' }} src={GOOD_ICON} alt='good' />
                                </button>
                                <button onClick={() => setInputBadFeedback(true)} className={styles.feedback}>
                                    <img style={{ width: '2.5rem', height: '100%' }} src={BAD_ICON} alt='bad' />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewsClassifier;

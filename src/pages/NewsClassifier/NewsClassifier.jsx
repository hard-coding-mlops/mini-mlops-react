import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PageHeader from '../../components/PageHeader/PageHeader';
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

    const classifyArticle = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
        setFirstTry(false);
    };

    const goodFeedback = async () => {
        console.log(category);
        await axios.post(
            `${process.env.REACT_APP_COLAB_SERVER_URL}/model/evaluate`,
            {
                client_id: clientID,
                reinput: category,
            },
            {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            }
        );
    };
    const badFeedback = async () => {
        const categories = ['사회', '정치', '경제', '국제', '문화', '예능', '스포츠', 'IT'];
        if (categories.includes(badFeedbackRef.current.value)) {
            const result = await axios.post(
                `${process.env.REACT_APP_COLAB_SERVER_URL}/model/evaluate`,
                {
                    client_id: clientID,
                    reinput: badFeedbackRef.current.value,
                },
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'any-value',
                    },
                }
            );
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

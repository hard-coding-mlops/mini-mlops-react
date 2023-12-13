import { useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './NewsClassifier.module.css';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PageTemplate from '../PageTemplate/PageTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import { useNavigate } from 'react-router-dom';

function NewsClassifier() {
    const navigate = useNavigate();
    const articleInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [category, setCategory] = useState('');
    const [firstTry, setFirstTry] = useState(true);

    const classifyArticle = async () => {
        setIsLoading(true);
        const article = articleInputRef.current.value;

        // 3초 기다림(모델 예측 불러올 때에는 지울 것!)
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // alert(article);
        // const result = await axios.post(`${process.env.REACT_APP_COLAB_SERVER_URL}/classifier/classify`, {
        //   content: article,
        // });

        // setCategory(result.data.category);

        setCategory('사회');
        setIsLoading(false);
        setFirstTry(false);
    };

    const resultOrGetResult = () => {
        if (category !== '') {
            return (
                <PageHeader>
                    <span>{category} 분야입니다.</span>
                </PageHeader>
            );
        }

        return (
            <>
                {isLoading ? (
                    <LoadingSpinner spinnerStyle={{ position: 'inherit' }} />
                ) : (
                    <PageHeader>
                        <button className={styles.classifyingButton} onClick={classifyArticle}>
                            <span>분류하기</span>
                        </button>
                    </PageHeader>
                )}
            </>
        );
    };

    return (
        <div className={styles.newsClassifier}>
            <button className={styles.toAdmin} onClick={() => navigate('/')}>
                관리자이신가요?
            </button>
            <span className={styles.modelName}>model_name_1 에게 물어보기</span>
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
                                해당 기사는{' '}
                                <span
                                    style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    &nbsp;{category}&nbsp;
                                </span>{' '}
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
                    ) : (
                        <button onClick={classifyArticle} className={styles.askModel}>
                            {firstTry ? '분류하기' : '다시하기'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewsClassifier;

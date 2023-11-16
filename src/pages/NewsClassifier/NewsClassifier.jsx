import { useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './NewsClassifier.module.css';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function NewsClassifier() {
  const articleInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState('');

  const classifyArticle = async () => {
    setIsLoading(true);
    const article = articleInputRef.current.value;

    // 3초 기다림(모델 예측 불러올 때에는 지울 것!)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/classifier/classify`, {
      content: article,
    });

    setCategory(result.data.category);

    setIsLoading(false);
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
      <PageHeader>어떤 기사를 분류하시겠습니까?</PageHeader>
      <div className={styles.newsClassifierBody}>
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
        <div className={styles.classifyingButtonContainer}>{resultOrGetResult()}</div>
      </div>
    </div>
  );
}

export default NewsClassifier;

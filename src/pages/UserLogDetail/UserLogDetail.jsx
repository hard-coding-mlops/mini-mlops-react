import { useParams } from 'react-router-dom';

import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';

import styles from './UserLogDetail.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDateTime } from '../../utils/formatters';

const logInfo = {
    id: 1,
    model: 'model_name_1',
    datetime: '2023 / 11 / 21   15 : 28',
    predict: '사회',
    expected: '',
    accuracy: 82.138,
    userInput: `SK텔레콤·KT·LG유플러스 이동통신 3사는 PASS앱을 이용해 영업점주가 방문 고객의 성인 여부를 파악할 수 있는 'PASS 모바일신분증 검증 서비스'를 출시했다.
  실물 신분증과 동일한 법적 효력을 인정받은 PASS 모바일신분증(주민등록증 모바일 확인서비스, 모바일운전면허 확인서비스)의 QR코드 식별을 통해 성인 인증 및 신분증의 진위 여부를 확인할 수 있다.
  이번 서비스는 영업점주가 PASS 앱에 있는 'QR인증' 메뉴를 통해 영업점을 찾은 고객의 스마트폰 PASS 앱 내에 있는 모바일신분증의 QR코드를 스캔하는 방식이다. 영업점주와 고객의 스마트폰에 PASS 앱이 설치돼 있으면 무료로 이용할 수 있다.
  이에 따라 주류 판매 매장 등 성인 인증이 중요한 업종의 점주 및 젊은 층을 중심으로 활용도가 높을 것으로 기대`,
};

function UserLogDetail() {
    const { clientId } = useParams();

    const [logInfo, setLogInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getLogInfo = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/clients/${clientId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });

        const { acc, client_result, model_name, predict_result, use_at, user_insert } = result.data;
        setLogInfo({
            id: clientId,
            model: model_name,
            datetime: use_at,
            predict: predict_result,
            expected: client_result,
            accuracy: acc,
            userInput: user_insert,
        });
    };

    useEffect(() => {
        getLogInfo();
    }, []);

    return (
        <PageTemplate>
            <HeaderTemplate>{logInfo.name} 상세 정보</HeaderTemplate>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tr>
                            <td className={styles.label}>사용 일시</td>
                            <td className={styles.data}>{formatDateTime(logInfo.datetime)}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>예측 모델</td>
                            <td className={styles.data}>{logInfo.model}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>예측 결과</td>
                            <td className={styles.data}>{logInfo.predict}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>기대 결과</td>
                            <td className={styles.data}>{logInfo.expected === '' ? ' - ' : logInfo.expected}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>정확도</td>
                            <td className={styles.data}>{logInfo.accuracy}%</td>
                        </tr>
                        <tr>
                            <td className={`${styles.label} ${styles.userInputContainer}`}>사용자 입력</td>
                            <td className={styles.data}>{logInfo.userInput}</td>
                        </tr>
                    </table>
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

export default UserLogDetail;

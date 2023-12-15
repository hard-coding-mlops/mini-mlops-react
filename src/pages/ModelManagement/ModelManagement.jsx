import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import ProgressiveBox from '../../components/ProgressiveBox/ProgressiveBox';
import Loading from '../../pages/Loading/Loading';
import { formatDateTime } from '../../utils/formatters';

import styles from './ModelManagement.module.css';
import axios from 'axios';

export default function ModelManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const pageQuery = Number(new URLSearchParams(location.search).get('page')) || 1;

    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // APIs
    const calculatePages = async () => {
        setIsLoading(true);
        const result = await axios.get(`${process.env.REACT_APP_COLAB_SERVER_URL}/model`, {
            headers: {
                'ngrok-skip-browser-warning': 'any-value',
            },
        });
        // console.log(Math.ceil(result.data.data.length / 10));
        const pages = Math.ceil(result.data.data.length / 10);
        setTotalPages(pages);
        setIsLoading(false);
    };
    const getTotalModels = async (pageNumber) => {
        // setIsLoading(true);
        const result = await axios.get(
            `${process.env.REACT_APP_COLAB_SERVER_URL}/model/?skip=${10 * (pageNumber - 1)}&limit=12`,
            {
                headers: {
                    'ngrok-skip-browser-warning': 'any-value',
                },
            }
        );
        setModels(result.data.data);
        // setIsLoading(false);
    };
    useEffect(() => {
        calculatePages();
        getTotalModels(pageQuery);
    }, [pageQuery]);

    return (
        <PageTemplate>
            {isLoading && <Loading message={'모델 가져오는 중'} />}
            <HeaderTemplate>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>모델 관리</span>
                    <Icon
                        label='add'
                        handleOnClick={() => {
                            navigate('/model/add');
                        }}
                    />
                </div>
            </HeaderTemplate>
            <BodyTemplate>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th className={styles.tableHeaderLabel}>ID</th>
                                <th className={styles.tableHeaderLabel}>모델명</th>
                                <th className={styles.tableHeaderLabel}>학습 일자</th>
                                <th className={styles.tableHeaderLabel}>
                                    <div className={styles.labelContainer}>
                                        <span>파라미터</span>
                                        <div className={styles.labelSub}>data, epochs, batch size, max length</div>
                                    </div>
                                </th>
                                <th className={styles.tableHeaderLabel}>정확도</th>
                                <th className={styles.tableHeaderLabel}>손실</th>
                                <th className={styles.tableHeaderLabel}>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map((model) => {
                                return (
                                    <tr
                                        key={model.model_id}
                                        onClick={() => {
                                            navigate(`/model/${model.model_id}`);
                                        }}
                                        className={styles.tableRow}
                                    >
                                        <td className={styles.tableData}>{model.model_id}</td>
                                        <td className={styles.tableData}>{model.model_name}</td>
                                        <td className={`${styles.tableData} `}>{model.created_at}</td>
                                        <td className={styles.tableData}>
                                            {model.data_length * 8}, {model.num_epochs}, {model.batch_size},{' '}
                                            {model.max_length}
                                        </td>
                                        <td className={styles.tableData}>
                                            <ProgressiveBox item={'accuracy'} percentage={model.acc} />
                                        </td>
                                        <td className={styles.tableData}>
                                            <ProgressiveBox item={'loss'} percentage={model.loss} />
                                        </td>
                                        <td className={styles.tableData}>
                                            <div className={styles.condition}>
                                                {/* <Icon label='edit' handleOnClick={() => alert('edit')} /> */}
                                                <Icon
                                                    label='test'
                                                    handleOnClick={(e) => {
                                                        e.stopPropagation();
                                                        alert('test');
                                                    }}
                                                />
                                                <Icon
                                                    label='deploy'
                                                    handleOnClick={async (e) => {
                                                        e.stopPropagation();
                                                        // model.model_id
                                                        const result = await axios.get(
                                                            `${process.env.REACT_APP_COLAB_SERVER_URL}/model/deploy/${model.model_id}`,
                                                            {
                                                                headers: {
                                                                    'ngrok-skip-browser-warning': 'any-value',
                                                                },
                                                            }
                                                        );
                                                        alert(
                                                            `ID) ${model.model_id}, 모델명) ${model.model_name} 배포되었습니다.`
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* <div className={styles.pageButtonContainer}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${styles.pageButton} ${pageQuery === index + 1 ? styles.currentPage : ''}`}
              onClick={() => {
                navigate(`/data?page=${index + 1}`);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
            </BodyTemplate>
        </PageTemplate>
    );
}

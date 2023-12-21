import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Skeleton } from '@mui/material';

import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';
import ProgressiveBox from '../../components/ProgressiveBox/ProgressiveBox';
import LossProgressiveBox from '../../components/ProgressiveBox/LossProgressiveBox';
import { formatDate } from '../../utils/formatters';

import styles from './ModelManagement.module.css';

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
        const result = await axios.get(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/model`);
        // console.log(Math.ceil(result.data.data.length / 10));
        const pages = Math.ceil(result.data.data.length / 10);
        setTotalPages(pages);
        setIsLoading(false);
    };
    const getTotalModels = async (pageNumber) => {
        // setIsLoading(true);
        // console.log('ModelManagement');
        const result = await axios.get(
            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/?skip=${10 * (pageNumber - 1)}&limit=10`
        );
        console.log('[TOTAL MODELS]', result.data.data);
        setModels(result.data.data);
        // setIsLoading(false);
    };
    useEffect(() => {
        calculatePages();
        getTotalModels(pageQuery);
    }, [pageQuery]);

    return (
        <PageTemplate>
            {/* <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>모델 관리</span>
                    <Icon
                        label='add'
                        handleOnClick={() => {
                            navigate('/model/add');
                        }}
                    />
                </div> */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HeaderTemplate title={'모델 관리'} routes={'model'} />
                <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Icon
                        label='add'
                        handleOnClick={() => {
                            navigate('/model/add');
                        }}
                    />
                </div>
            </div>
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
                                <th className={styles.tableHeaderLabel}>손실도</th>
                                <th className={styles.tableHeaderLabel}>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map((model, index) =>
                                isLoading ? (
                                    <tr key={index}>
                                        <td colSpan={7}>
                                            <div style={{ height: '0.5rem' }}></div>
                                            <Skeleton variant='rounded' width={'100%'} height={'3.5rem'} />
                                            <div style={{ height: '0.5rem' }}></div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr
                                        key={model.model_id}
                                        onClick={() => {
                                            navigate(`/model/${model.model_id}`);
                                        }}
                                        className={styles.tableRow}
                                    >
                                        <td className={styles.tableData}>{model.model_id}</td>
                                        <td className={styles.tableData}>{model.model_name}</td>
                                        <td className={`${styles.tableData} `}>{formatDate(model.created_at)}</td>
                                        <td className={styles.tableData}>
                                            {model.data_length * 8}, {model.num_epochs}, {model.batch_size},{' '}
                                            {model.max_length}
                                        </td>
                                        <td className={styles.tableData}>
                                            <ProgressiveBox item={'accuracy'} percentage={model.acc} />
                                        </td>
                                        <td className={styles.tableData}>
                                            {/* {model.loss.toFixed(2)} */}
                                            <LossProgressiveBox item={'loss'} percentage={model.loss} />
                                        </td>
                                        <td className={styles.tableData}>
                                            <div className={styles.condition}>
                                                {/* <Icon label='edit' handleOnClick={() => alert('edit')} /> */}
                                                <Icon
                                                    label='test'
                                                    handleOnClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/model/test/${model.model_name}`);
                                                    }}
                                                />
                                                <Icon
                                                    label='deploy'
                                                    handleOnClick={async (e) => {
                                                        e.stopPropagation();
                                                        // model.model_id
                                                        const result = await axios.get(
                                                            `${process.env.REACT_APP_UBUNTU_SERVER_URL}/model/deploy/${model.model_id}`
                                                        );
                                                        console.log(model.model_id, result.data);
                                                        toast.success(`${model.model_name} 배포되었습니다.`);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pageButtonContainer}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`${styles.pageButton} ${pageQuery === index + 1 ? styles.currentPage : ''}`}
                            onClick={() => {
                                navigate(`/model?page=${index + 1}`);
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </BodyTemplate>
        </PageTemplate>
    );
}

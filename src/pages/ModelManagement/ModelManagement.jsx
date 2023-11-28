import Icon from '../../components/Icon/Icon';
import BodyTemplate from '../PageTemplate/BodyTemplate';
import HeaderTemplate from '../PageTemplate/HeaderTemplate';
import PageTemplate from '../PageTemplate/PageTemplate';

import { formatDateTime } from '../../utils/formatters';

import styles from './ModelManagement.module.css';
import ProgressiveBox from '../../components/ProgressiveBox/ProgressiveBox';
import { useNavigate } from 'react-router-dom';

const dummyData = [
  {
    id: 1,
    name: 'model_name_1',
    datetime: '2023 / 11 / 21',
    parameters: [1200, 14, 5, 8],
    accuracy: 82.138,
    loss: 19.053,
  },
  {
    id: 2,
    name: 'monte_2',
    datetime: '2023 / 11 / 27',
    parameters: [1000, 10, 5, 4],
    accuracy: 80.138,
    loss: 22.68,
  },
];

export default function ModelManagement() {
  const navigate = useNavigate();

  return (
    <PageTemplate>
      <HeaderTemplate>모델 관리</HeaderTemplate>
      <BodyTemplate>
        {' '}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
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
              {dummyData.map((data) => {
                return (
                  <tr
                    key={data.id}
                    onClick={() => {
                      navigate(`/model/${data.id}`);
                    }}
                    className={styles.tableRow}
                  >
                    <td className={styles.tableData}>{data.name}</td>
                    <td className={`${styles.tableData} `}>{data.datetime}</td>
                    <td className={styles.tableData}>{data.parameters.join(',  ')}</td>
                    <td className={styles.tableData}>
                      <ProgressiveBox item={'accuracy'} percentage={data.accuracy} />
                    </td>
                    <td className={styles.tableData}>
                      <ProgressiveBox item={'loss'} percentage={data.loss} />
                    </td>
                    <td className={styles.tableData}>
                      <div className={styles.condition}>
                        <Icon
                          label='edit'
                          handleOnClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                        <Icon
                          label='deploy'
                          handleOnClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>{' '}
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

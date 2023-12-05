import { useRef } from 'react';

import styles from './MessageModal.module.css';

function MessageModal({ children, onClose }) {
  const modalRef = useRef();

  const handleWholeScreenClick = (e) => {
    // 클릭된 요소가 모달 외부의 부분인 경우에만 모달을 닫습니다.
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className={styles.wholeScreen} onClick={handleWholeScreenClick}>
      <div ref={modalRef} className={styles.messageModal}>
        {children}
      </div>
    </div>
  );
}

export default MessageModal;

import { MouseEvent, PropsWithChildren, useEffect } from 'react';
import styles from './OffCanvas.module.scss';
import CloseIcon from './img/CloseIcon';

type Props = {
  children: PropsWithChildren['children']
  show: boolean
  onHide: () => void
  customStyles?: {
    [key: string]: unknown
  } | null
  size: 'sm' | 'lg' | 'xl'
}

const OffCanvas = ({
  children,
  show,
  onHide,
  customStyles = null,
  size = 'lg'
}: Props) => {
  const sizes = {
    'sm': 400,
    'lg': 700,
    'xl': 1000
  }

  const modalStyles = {
    width: sizes[size]
  }

  useEffect(() => {
    const escKeydown = (e: WindowEventMap['keydown']) => {
      if (e.key == 'Escape') {
        onHide()
      }
    }

    window.addEventListener('keydown', escKeydown)

    return () => {
      window.removeEventListener('keydown', escKeydown)
    }
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'; // Запрет прокрутки фона при открытом модальном окне
    } else {
      document.body.style.overflow = ''; // Возврат прокрутки фона при закрытом модальном окне
    }
  }, [show]);

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onHide();
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${show ? styles.visible : ''}`} onClick={handleOutsideClick}>
      <div className={`${styles.modal} ${show ? styles.open : ''}`} style={customStyles !== null ? { ...modalStyles, ...customStyles } : modalStyles}>
        <div className={styles.content}>
          <button className={styles.closeButton} onClick={onHide}>
            Закрыть
            <CloseIcon />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default OffCanvas
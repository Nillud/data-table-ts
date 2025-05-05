import { MouseEvent, PropsWithChildren, ReactElement, useEffect } from "react";
import styles from './Modal.module.scss';
import CloseLine from './img/CloseLine';

type customStyles = {
    [key: string]: unknown
}

type Modal = {
    show: boolean
    onHide: () => void
    title: string
    children: PropsWithChildren["children"]
    isFooter: boolean
    footerContent: ReactElement | null
    customStyles: customStyles | null
    size: 'sm' | 'lg' | 'xl'
}

const Modal = ({
    show,
    onHide,
    title = '',
    children,
    isFooter = false,
    footerContent = null,
    customStyles = null,
    size = 'lg'
}: Modal) => {
    const sizes = {
        'sm': 400,
        'lg': 700,
        'xl': 1000
    }

    const modalStyles = {
        width: sizes[size]
    }

    useEffect(() => {
        const escKeydown = (e: KeyboardEvent) => {
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
            <div className={`${styles.modal} ${show ? styles.visible : ''}`} style={customStyles !== null ? { ...modalStyles, ...customStyles } : modalStyles}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>{title}</h3>
                </div>
                <button className={styles.closeBtn} onClick={onHide}>
                    <CloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className={styles.modalContent}>
                    {children}
                </div>
                {
                    isFooter &&
                    <div className={styles.modalFooter}>
                        <div className={styles.footerContainer}>
                            {footerContent}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Modal;
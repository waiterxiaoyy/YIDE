import styles from './index.module.less';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, title, message, onConfirm, onCancel } = props;

  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.confirmDialogOverlay}>
      <div className={styles.confirmDialog}>
        <div className={styles.tooBar}></div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.message}>{message}</div>
        </div>
        <div className={styles.confirmDialogButtons}>
          <button className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.ok} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

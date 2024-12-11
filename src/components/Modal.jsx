import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  const handleDialogClose = () => {
    onClose(); // 부모 컴포넌트의 상태를 업데이트
  };

  return createPortal(
    <dialog
      className="modal"
      ref={dialog}
      onClose={handleDialogClose} // ESC 키로 닫힐 때 호출
    >
      <div className="modal-content">
        <button
          onClick={handleDialogClose}
          className="modal-close-btn"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;

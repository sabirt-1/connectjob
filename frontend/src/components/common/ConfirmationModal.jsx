


import "./ConfirmationModal.css";

function ConfirmationModal({

    isOpen,

    title,

    message,

    confirmText = "Delete",

    cancelText = "Cancel",

    onConfirm,

    onCancel

}) {

    if (!isOpen) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div className="confirmation-modal">

                <h2>

                    {title}

                </h2>

                <p>

                    {message}

                </p>

                <div className="modal-buttons">

                    <button

                        className="cancel-button"

                        onClick={onCancel}

                    >

                        {cancelText}

                    </button>

                    <button

                        className="confirm-button"

                        onClick={onConfirm}

                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmationModal;


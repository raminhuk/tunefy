import { FaRegTimesCircle } from "react-icons/fa";


interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<PopupProps> = ({ open, onClose, children }) => {

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div onClick={onClose} className="absolute inset-0 bg-black opacity-80"></div>
          <div className="z-10 bg-white rounded-lg p-4 shadow-md" style={{maxHeight: '95vh',maxWidth: '75%'}}>
            <button
              className="absolute top-0 right-0 p-5 text-white hover:text-gray-400"
              onClick={onClose}
            >
             <FaRegTimesCircle size={32}/>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <div className="mb-6">
          {children}
        </div>
        {footer && <div className="border-t pt-4 flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>
  );
};
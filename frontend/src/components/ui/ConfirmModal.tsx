import BotonFormulario from "./BottonFormulario";

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  visible,
  title = "Confirmar acción",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: ConfirmModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <BotonFormulario px={4} py={2} color="gray" texto={cancelText} onClick={onCancel}/>
          <BotonFormulario px={4} py={2} color="red" texto={confirmText} onClick={onConfirm}/>
        </div>
      </div>
    </div>
  );
}

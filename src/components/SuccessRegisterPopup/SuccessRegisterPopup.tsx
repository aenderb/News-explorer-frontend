import PopupWithForm from "../PopupWithForm/PopupWithForm";

interface SuccessRegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLogin?: () => void;
}

function SuccessRegisterPopup({ isOpen, onClose, onGoToLogin }: SuccessRegisterPopupProps) {
  const handleGoToLogin = () => {
    onClose();
    if (onGoToLogin) {
      onGoToLogin();
    }
  };

  return (
    <PopupWithForm title="Cadastro concluído com sucesso!" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <button
          type="button"
          className="text-[#2F71E5] hover:underline text-left font-inter text-lg"
          onClick={handleGoToLogin}
        >
          Entrar
        </button>
      </div>
    </PopupWithForm>
  );
}

export default SuccessRegisterPopup;

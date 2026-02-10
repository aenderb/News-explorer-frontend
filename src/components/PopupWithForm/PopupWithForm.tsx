import { ReactNode } from "react";
import closeButton from "../../images/close.svg";

interface PopupWithFormProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function PopupWithForm({ title, isOpen, onClose, children }: PopupWithFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[calc(100%-32px)] max-w-[430px] relative p-6 md:p-9">
        <button 
          className="absolute -top-10 -right-10 md:-top-12 md:-right-12 w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity"
          onClick={onClose}
        >
          <img src={closeButton} alt="Fechar modal" className="w-10 h-10" />
        </button>
        <h2 className="font-inter text-2xl font-black text-[#1a1b22] mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;
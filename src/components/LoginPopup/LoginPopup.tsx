import { useState, FormEvent } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
  onSwitchToRegister?: () => void;
}

function LoginPopup({ isOpen, onClose, onLogin, onSwitchToRegister }: LoginPopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isEmailValid && password.length >= 6;
  const showEmailError = email.length > 0 && !isEmailValid;
  const showPasswordError = password.length > 0 && password.length < 6;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid && onLogin) {
      onLogin(email, password);
    }
  };

  return (
    <PopupWithForm title="Entrar" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-6">
          <label className="block font-inter text-xs font-normal text-[#2F71E5] mb-2">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira o e-mail"
            minLength={5}
            className="w-full h-12 px-0 pb-2 border-b border-[#D1D2D6] font-inter text-sm text-[#1a1b22] placeholder:text-[#B6BCBF] focus:outline-none focus:border-[#2F71E5] bg-transparent"
            required
          />
          {showEmailError && (
            <p className="mt-2 text-xs text-red-500 font-inter">
              Informe um e-mail valido.
            </p>
          )}
        </div>

        <div className="mb-8">
          <label className="block font-inter text-xs font-normal text-[#2F71E5] mb-2">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insira a senha"
            minLength={6}
            className="w-full h-12 px-0 pb-2 border-b border-[#D1D2D6] font-inter text-sm text-[#1a1b22] placeholder:text-[#B6BCBF] focus:outline-none focus:border-[#2F71E5] bg-transparent"
            required
          />
          {showPasswordError && (
            <p className="mt-2 text-xs text-red-500 font-inter">
              A senha deve ter no minimo 6 caracteres.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full h-12 rounded-full font-roboto text-lg font-normal transition-colors ${
            isFormValid
              ? "bg-button-blue text-white hover:bg-[#2862cc]"
              : "bg-[#E6E8EB] text-[#B6BCBF] cursor-not-allowed"
          }`}
        >
          Entrar
        </button>

        <p className="text-center font-inter text-xs text-[#1a1b22] mt-4">
          ou{" "}
          <button
            type="button"
            className="text-[#2F71E5] hover:underline"
            onClick={() => {
              onClose();
              onSwitchToRegister?.();
            }}
          >
            Inscrever-se
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default LoginPopup;

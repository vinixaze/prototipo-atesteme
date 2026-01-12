import React, { useState, useEffect } from "react";
// @ts-expect-error: Image asset not found in dev environment, placeholder used for type safety.
import backgroundImage from "../../assets/934760553d44b42ec1dd098296a4a1143272299c.png";
// @ts-expect-error: Image asset not found in dev environment, placeholder used for type safety.
import logoImage from "../../assets/bd6e15ee05cd5d9957a2d399e18c0693a6190505.png";
import { LoginBackground } from "./login/LoginBackground";
import { LoginCard } from "./login/LoginCard";
import { LoginDesktopFooter } from "./login/LoginDesktopFooter";
import { LoginDesktopLogo } from "./login/LoginDesktopLogo";
import { LoginInstallBanner } from "./login/LoginInstallBanner";
import { LoginMobileLogo } from "./login/LoginMobileLogo";

interface LoginPageProps {
  onLogin?: (name: string) => void;
  navigateTo: (page: string) => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function LoginPage({ onLogin, navigateTo }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  // Detectar prompt de instalação PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;

      setDeferredPrompt(installEvent);
      setCanInstall(true);
      setShowInstallBanner(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setCanInstall(false);
      setShowInstallBanner(false);
      localStorage.setItem("pwa-install-banner-shown", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);


  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setCanInstall(false);
    setShowInstallBanner(false);
    localStorage.setItem("pwa-install-banner-shown", "true");
  };


  const handleDismissInstall = () => {
    setShowInstallBanner(false);
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Campo obrigatório";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfRegex = /^\d{11}$/;
    const cpfWithMaskRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (
      !emailRegex.test(value) &&
      !cpfRegex.test(value) &&
      !cpfWithMaskRegex.test(value)
    ) {
      return "Email ou CPF inválido";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Campo obrigatório";
    }
    if (value.length < 6) {
      return "Senha deve ter no mínimo 6 caracteres";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    setIsLoading(true);

    // Simular chamada de API
    setTimeout(() => {
      setIsLoading(false);
      // Extrair nome do email ou usar nome padrão
      const name = email.split("@")[0] || "Usuário";
      onLogin?.(name);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.("Usuário");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex items-center justify-center relative dark:bg-gray-900">
      <LoginInstallBanner
        show={showInstallBanner}
        canInstall={canInstall}
        onInstall={handleInstallClick}
        onDismiss={handleDismissInstall}
      />
      <LoginBackground backgroundImage={backgroundImage} />
      <LoginDesktopLogo logoImage={logoImage} />
      <LoginCard
        email={email}
        password={password}
        showPassword={showPassword}
        emailError={emailError}
        passwordError={passwordError}
        isLoading={isLoading}
        onEmailChange={(value) => {
          setEmail(value);
          if (emailError) setEmailError("");
        }}
        onPasswordChange={(value) => {
          setPassword(value);
          if (passwordError) setPasswordError("");
        }}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={handleSubmit}
        onForgotPassword={() => navigateTo("forgot-password")}
        onGoogleLogin={handleGoogleLogin}
        onNavigate={navigateTo}
      />
      <LoginMobileLogo logoImage={logoImage} />
      <LoginDesktopFooter onNavigate={navigateTo} />
    </div>
  );
}

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PricingSection from './components/PricingSection';
import AuthModal from './components/AuthModal';
import ChatInterface from './components/ChatInterface';
import FullscreenChatInterface from './components/FullscreenChatInterface';
import { User } from './types';
import { authenticateUser, registerUser } from './utils/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreenChatOpen, setIsFullscreenChatOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handleLogin = (email: string, password: string) => {
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthModalOpen(false);
      // Auto-abrir chat fullscreen para usuarios autenticados
      setIsFullscreenChatOpen(true);
    } else {
      alert('Credenciales incorrectas. Usa: demo@autobusiness.ai');
    }
  };

  const handleRegister = (name: string, email: string, password: string, plan: string) => {
    const newUser = registerUser(name, email, password, plan);
    setUser(newUser);
    setIsAuthModalOpen(false);
    // Auto-abrir chat fullscreen después del registro
    setIsFullscreenChatOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsChatOpen(false);
    setIsFullscreenChatOpen(false);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      // Si ya está autenticado, abrir directamente el chat fullscreen
      setIsFullscreenChatOpen(true);
    }
  };

  const handleGetStarted = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      // Abrir chat fullscreen en lugar del chat pequeño
      setIsFullscreenChatOpen(true);
    }
  };

  const handleCreditUpdate = (newCredits: number) => {
    if (user) {
      setUser({ ...user, credits: newCredits });
    }
  };

  const handleShowChat = () => {
    if (user) {
      // Usar chat fullscreen como experiencia principal
      setIsFullscreenChatOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleUpgradePlan = () => {
    // Aquí se abriría un modal de actualización de plan
    // Por ahora, simplemente mostramos una alerta
    alert('Funcionalidad de actualización de plan en desarrollo. Contacta con soporte para upgrades.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        isAuthenticated={!!user}
        user={user || undefined}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onShowChat={handleShowChat}
      />
      
      {/* Mostrar contenido principal solo si no está el chat fullscreen abierto */}
      {!isFullscreenChatOpen && (
        <>
          <Hero onGetStarted={handleGetStarted} />
          <Features />
          <PricingSection onSelectPlan={handleSelectPlan} />
        </>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        selectedPlan={selectedPlan}
      />

      {/* Chat pequeño (legacy - solo para casos específicos) */}
      {user && isChatOpen && !isFullscreenChatOpen && (
        <ChatInterface
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          user={user}
          onCreditUpdate={handleCreditUpdate}
        />
      )}

      {/* Nuevo chat fullscreen - experiencia principal */}
      {user && (
        <FullscreenChatInterface
          isOpen={isFullscreenChatOpen}
          onClose={() => setIsFullscreenChatOpen(false)}
          user={user}
          onCreditUpdate={handleCreditUpdate}
          onUpgradePlan={handleUpgradePlan}
        />
      )}

      {/* Footer - solo mostrar si no está el chat fullscreen abierto */}
      {!isFullscreenChatOpen && (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AutoBusiness AI
                </span>
              </h3>
              <p className="text-gray-400 mb-8">
                Revolucionando la consultoría empresarial con inteligencia artificial
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Contacto</a>
                <a href="#" className="hover:text-white transition-colors">Soporte</a>
              </div>
              <p className="text-gray-500 text-sm mt-8">
                © 2025 AutoBusiness AI. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PricingSection from './components/PricingSection';
import AuthModal from './components/AuthModal';
import ChatInterface from './components/ChatInterface';
import { User } from './types';
import { authenticateUser, registerUser } from './utils/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handleLogin = (email: string, password: string) => {
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthModalOpen(false);
      // Auto-abrir chat para usuarios autenticados
      setIsChatOpen(true);
    } else {
      alert('Credenciales incorrectas. Usa: demo@autobusiness.ai');
    }
  };

  const handleRegister = (name: string, email: string, password: string, plan: string) => {
    const newUser = registerUser(name, email, password, plan);
    setUser(newUser);
    setIsAuthModalOpen(false);
    setIsChatOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsChatOpen(false);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  const handleGetStarted = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsChatOpen(true);
    }
  };

  const handleCreditUpdate = (newCredits: number) => {
    if (user) {
      setUser({ ...user, credits: newCredits });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        isAuthenticated={!!user}
        user={user || undefined}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onShowChat={() => setIsChatOpen(true)}
      />
      
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <PricingSection onSelectPlan={handleSelectPlan} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        selectedPlan={selectedPlan}
      />

      {user && (
        <ChatInterface
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          user={user}
          onCreditUpdate={handleCreditUpdate}
        />
      )}

      {/* Footer */}
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
    </div>
  );
}

export default App;
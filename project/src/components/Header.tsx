import React, { useState } from 'react';
import { Bot, Menu, X, User, LogOut } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  user?: { name: string; plan: string; credits: number };
  onLogin: () => void;
  onLogout: () => void;
  onShowChat: () => void;
}

export default function Header({ isAuthenticated, user, onLogin, onLogout, onShowChat }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AutoBusiness AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Características</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Precios</a>
            {isAuthenticated && (
              <button
                onClick={onShowChat}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Chat IA
              </button>
            )}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">Plan: </span>
                  <span className="font-semibold text-blue-600">{user.plan}</span>
                  <span className="text-gray-600 ml-2">Créditos: </span>
                  <span className="font-semibold text-green-600">{user.credits}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <button
                    onClick={onLogout}
                    className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Características</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Precios</a>
              {isAuthenticated && (
                <button
                  onClick={() => { onShowChat(); setIsMenuOpen(false); }}
                  className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Chat IA
                </button>
              )}
              {isAuthenticated && user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Plan: </span>
                    <span className="text-sm font-semibold text-blue-600">{user.plan}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Créditos: </span>
                    <span className="text-sm font-semibold text-green-600">{user.credits}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onLogin(); setIsMenuOpen(false); }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
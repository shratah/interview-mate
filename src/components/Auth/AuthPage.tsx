import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import './AuthPage.css';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="auth-page">
      <button className="back-btn" onClick={onBack}>
        <X className="w-6 h-6" />
      </button>
      
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Continue your interview journey</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-forms-container">
          <div className={`auth-form-wrapper ${mode === 'login' ? 'active' : ''}`}>
            <LoginForm onSuccess={onAuthSuccess} />
          </div>
          <div className={`auth-form-wrapper ${mode === 'signup' ? 'active' : ''}`}>
            <SignupForm onSuccess={onAuthSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};
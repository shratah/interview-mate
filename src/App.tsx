import React, { useState } from 'react';
import { WelcomePage } from './components/Welcome/WelcomePage';
import { AuthPage } from './components/Auth/AuthPage';
import { OnboardingPage } from './components/Onboarding/OnboardingPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InterviewPage } from './components/Interview/InterviewPage';
import './App.css';

type AppStage = 'welcome' | 'auth' | 'onboarding' | 'dashboard' | 'interview';

function App() {
  const [stage, setStage] = useState<AppStage>('welcome');

  const handleStartNow = () => setStage('auth');

  const handleAuthSuccess = () => {
    const hasOnboarded = localStorage.getItem('onboarded') === 'true';
    setStage(hasOnboarded ? 'dashboard' : 'onboarding');
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarded', 'true');
    setStage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('onboarded');
    setStage('welcome');
  };

  const handleStartInterview = () => setStage('interview');
  const handleEndInterview = () => setStage('dashboard');

  return (
    <div className="App">
      {stage === 'welcome' && <WelcomePage onStartNow={handleStartNow} />}
      {stage === 'auth' && (
        <AuthPage 
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setStage('welcome')}
        />
      )}
      {stage === 'onboarding' && (
        <OnboardingPage 
          onComplete={handleOnboardingComplete}
          onBack={() => setStage('auth')}
        />
      )}
      {stage === 'dashboard' && (
        <Dashboard 
          onLogout={handleLogout}
          onStartInterview={handleStartInterview}
        />
      )}
      {stage === 'interview' && (
        <InterviewPage onEnd={handleEndInterview} />
      )}
    </div>
  );
}

export default App;
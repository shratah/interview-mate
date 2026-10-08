import React, { useState, useEffect } from 'react';
import { WelcomePage } from './components/Welcome/WelcomePage';
import { AuthPage } from './components/Auth/AuthPage';
import { OnboardingPage } from './components/Onboarding/OnboardingPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InterviewPage } from './components/Interview/InterviewPage';
import { EditProfile } from './components/Profile/EditProfile';
import './App.css';

type AppStage = 'welcome' | 'auth' | 'onboarding' | 'dashboard' | 'interview' | 'editProfile';

function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const hasOnboarded = localStorage.getItem('onboarded') === 'true';

    if (user) {
      setStage(hasOnboarded ? 'dashboard' : 'onboarding');
    }
    setIsLoading(false);
  }, []);

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
  // ✅ Keep onboarded + onboardingData so next login skips onboarding
  setStage('welcome');
};

  const handleStartInterview = () => setStage('interview');
  const handleEndInterview = () => setStage('dashboard');
  const handleEditProfile = () => setStage('editProfile');
  const handleProfileSaved = () => setStage('dashboard');

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading Interview Mate...</p>
      </div>
    );
  }

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
          onEditProfile={handleEditProfile}
        />
      )}
      {stage === 'interview' && (
        <InterviewPage onEnd={handleEndInterview} />
      )}
      {stage === 'editProfile' && (
        <EditProfile onSave={handleProfileSaved} onBack={() => setStage('dashboard')} />
      )}
    </div>
  );
}

export default App;
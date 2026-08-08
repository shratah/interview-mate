import React from 'react';
import { ChevronDown, Sparkles, Users, Briefcase, Target } from 'lucide-react';
import './WelcomePage.css';

interface WelcomePageProps {
  onStartNow: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStartNow }) => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="welcome-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Interview Practice</span>
          </div>
          <h1 className="hero-title">
            Welcome to <span className="highlight">Interview Mate</span>
          </h1>
          <p className="hero-description">
            Master your interview skills with AI-powered mock interviews.
            Get real-time feedback, practice with industry experts, and land your dream internship.
          </p>
          <div className="hero-actions">
            <button className="start-now-btn" onClick={onStartNow}>
              Start Now
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <button className="scroll-indicator" onClick={scrollToFeatures}>
            <span>Scroll to learn more</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
        <div className="hero-graphic">
          <div className="floating-cards">
            <div className="card card-1">💼</div>
            <div className="card card-2">🎯</div>
            <div className="card card-3">🚀</div>
            <div className="card card-4">⭐</div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Interview Mate?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Users className="w-8 h-8" />
            </div>
            <h3>Realistic Mock Interviews</h3>
            <p>Practice with our AI interviewer that simulates real interview scenarios for internship positions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3>Industry-Specific Questions</h3>
            <p>Get tailored questions for your career path - from UI/UX to Backend Development.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Target className="w-8 h-8" />
            </div>
            <h3>Instant Feedback & Analysis</h3>
            <p>Receive detailed feedback on your responses and track your progress over time.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Tell us about your skills, experience, and career goals</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Start Practicing</h3>
            <p>Begin your interview session with our AI interviewer</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Feedback & Improve</h3>
            <p>Receive detailed analysis and track your improvement</p>
          </div>
        </div>
      </section>

      <footer className="welcome-footer">
        <p>© 2024 Interview Mate. All rights reserved.</p>
      </footer>
    </div>
  );
};
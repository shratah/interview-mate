import React from 'react';
import { LogOut, User, Award, Clock, TrendingUp, Mic } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
  onStartInterview: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, onStartInterview }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Interview Mate</h1>
        </div>
        <div className="nav-user">
          <span className="user-name">{user.name || 'User'}</span>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h2>Welcome back, {user.name || 'User'}! 👋</h2>
          <p>Ready to practice for your {onboardingData.careerPath?.replace('_', ' ') || 'internship'} interview?</p>
        </section>

        <div className="start-interview-section">
          <button className="start-interview-btn-large" onClick={onStartInterview}>
            <Mic size={24} />
            Start Mock Interview
          </button>
          <p className="start-interview-hint">Practice with AI interviewer • 5 questions • Instant feedback</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#667eea' }}>
              <Award size={24} />
            </div>
            <div className="stat-info">
              <h4>Total Interviews</h4>
              <p className="stat-value">12</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#34d399' }}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <h4>Success Rate</h4>
              <p className="stat-value">78%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f59e0b' }}>
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <h4>Practice Time</h4>
              <p className="stat-value">4.5 hrs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ef4444' }}>
              <User size={24} />
            </div>
            <div className="stat-info">
              <h4>Profile Strength</h4>
              <p className="stat-value">85%</p>
            </div>
          </div>
        </div>

        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn primary" onClick={onStartInterview}>
              Start New Interview
            </button>
            <button className="action-btn secondary">Review Feedback</button>
            <button className="action-btn secondary">View Progress</button>
          </div>
        </section>

        <section className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot green"></div>
              <div>
                <p className="activity-title">Completed Technical Interview</p>
                <p className="activity-time">2 hours ago</p>
              </div>
              <span className="activity-score">85%</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot blue"></div>
              <div>
                <p className="activity-title">Behavioral Interview Practice</p>
                <p className="activity-time">1 day ago</p>
              </div>
              <span className="activity-score">72%</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot yellow"></div>
              <div>
                <p className="activity-title">System Design Interview</p>
                <p className="activity-time">3 days ago</p>
              </div>
              <span className="activity-score">90%</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
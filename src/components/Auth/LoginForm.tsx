import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password) {
      // ✅ Check if this email has onboarded before
      const onboardedEmails = JSON.parse(localStorage.getItem('onboardedEmails') || '{}');
      
      localStorage.setItem('user', JSON.stringify({ email, name: 'Demo User' }));
      
      // ✅ If this email was onboarded before, restore onboarding data
      if (onboardedEmails[email]) {
        localStorage.setItem('onboarded', 'true');
        localStorage.setItem('onboardingData', JSON.stringify(onboardedEmails[email]));
      }
      
      onSuccess();
    } else {
      setError('Please fill in all fields');
    }
  } catch (err) {
    setError('Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={20} />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="auth-submit-btn" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <button type="button" className="social-btn">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        Continue with Google
      </button>
    </form>
  );
};
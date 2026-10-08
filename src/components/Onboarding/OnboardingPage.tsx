import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { CareerStage, CareerPath, SkillLevels } from '../../types';
import { SkillLevelSelector } from './SkillLevelSelector';
import './OnboardingPage.css';

interface OnboardingPageProps {
  onComplete: () => void;
  onBack: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    careerStage: '' as CareerStage,
    careerPath: '' as CareerPath,
    tools: [] as string[],
    developmentLanguages: [] as string[],
    skillLevels: {
      problemSolving: 0,
      communication: 0,
      technicalSkills: 0,
      leadership: 0,
      adaptability: 0
    } as SkillLevels
  });

  const [currentTool, setCurrentTool] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  const careerStages: { value: CareerStage; label: string }[] = [
    { value: 'student_undergraduate', label: 'Student (Undergraduate)' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'senior', label: 'Senior' }
  ];

  const careerPaths: { value: CareerPath; label: string }[] = [
    { value: 'ui_ux_designer', label: 'UI/UX Designer' },
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'qa_engineer', label: 'QA Engineer' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'backend_developer', label: 'Backend Developer' },
    { value: 'frontend_developer', label: 'Frontend Developer' },
    { value: 'mobile_developer', label: 'Mobile Developer' },
    { value: 'it_support', label: 'IT Support' }
  ];

  const skillCategories = [
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'communication', label: 'Communication' },
    { key: 'technicalSkills', label: 'Technical Skills' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'adaptability', label: 'Adaptability' }
  ];

  const addTool = () => {
    if (currentTool.trim() && !formData.tools.includes(currentTool.trim())) {
      setFormData(prev => ({
        ...prev,
        tools: [...prev.tools, currentTool.trim()]
      }));
      setCurrentTool('');
    }
  };

  const removeTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter(t => t !== tool)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage.trim() && !formData.developmentLanguages.includes(currentLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        developmentLanguages: [...prev.developmentLanguages, currentLanguage.trim()]
      }));
      setCurrentLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      developmentLanguages: prev.developmentLanguages.filter(l => l !== language)
    }));
  };

  const handleSkillLevelChange = (key: keyof SkillLevels, value: number) => {
    setFormData(prev => ({
      ...prev,
      skillLevels: {
        ...prev.skillLevels,
        [key]: value
      }
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (validateForm()) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // ✅ Save current session
  localStorage.setItem('onboardingData', JSON.stringify(formData));
  localStorage.setItem('onboarded', 'true');
  
  // ✅ Save permanently by email (so it survives logout)
  const onboardedEmails = JSON.parse(localStorage.getItem('onboardedEmails') || '{}');
  if (user.email) {
    onboardedEmails[user.email] = formData;
    localStorage.setItem('onboardedEmails', JSON.stringify(onboardedEmails));
  }
  
  onComplete();
}
    }
  };

  const validateForm = () => {
    const { age, careerStage, careerPath, tools, developmentLanguages, skillLevels } = formData;
    
    if (!age || parseInt(age) < 16 || parseInt(age) > 100) {
      alert('Please enter a valid age');
      return false;
    }
    if (!careerStage) {
      alert('Please select your career stage');
      return false;
    }
    if (!careerPath) {
      alert('Please select your career path');
      return false;
    }
    if (tools.length === 0) {
      alert('Please add at least one tool you know');
      return false;
    }
    if (developmentLanguages.length === 0) {
      alert('Please add at least one development language');
      return false;
    }
    
    const allRated = Object.values(skillLevels).every(level => level > 0);
    if (!allRated) {
      alert('Please rate all skills');
      return false;
    }
    
    return true;
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding-step">
            <h2>Tell us about yourself</h2>
            <p className="step-description">Let's get to know you better</p>
            
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                min="16"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Enter your age"
                className="onboarding-input"
              />
            </div>

            <div className="form-group">
              <label>Career Stage</label>
              <div className="options-grid">
                {careerStages.map((stage) => (
                  <button
                    key={stage.value}
                    className={`option-btn ${formData.careerStage === stage.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, careerStage: stage.value }))}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Career Path</label>
              <div className="options-grid">
                {careerPaths.map((path) => (
                  <button
                    key={path.value}
                    className={`option-btn ${formData.careerPath === path.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, careerPath: path.value }))}
                  >
                    {path.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="onboarding-step">
            <h2>Your Tools & Languages</h2>
            <p className="step-description">What tools and languages do you work with?</p>

            <div className="form-group">
              <label>Tools You Know</label>
              <div className="input-tag-group">
                <div className="input-tag-wrapper">
                  <input
                    type="text"
                    value={currentTool}
                    onChange={(e) => setCurrentTool(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTool()}
                    placeholder="Type a tool and press Enter"
                    className="onboarding-input"
                  />
                  <button type="button" onClick={addTool} className="add-tag-btn">
                    <Check size={16} />
                  </button>
                </div>
                <div className="tags-container">
                  {formData.tools.map((tool) => (
                    <span key={tool} className="tag">
                      {tool}
                      <button onClick={() => removeTool(tool)} className="remove-tag">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Development Languages</label>
              <div className="input-tag-group">
                <div className="input-tag-wrapper">
                  <input
                    type="text"
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    placeholder="Type a language and press Enter"
                    className="onboarding-input"
                  />
                  <button type="button" onClick={addLanguage} className="add-tag-btn">
                    <Check size={16} />
                  </button>
                </div>
                <div className="tags-container">
                  {formData.developmentLanguages.map((language) => (
                    <span key={language} className="tag">
                      {language}
                      <button onClick={() => removeLanguage(language)} className="remove-tag">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="onboarding-step">
            <h2>Rate Your Skills</h2>
            <p className="step-description">How would you rate yourself in these areas?</p>

            {skillCategories.map((skill) => (
              <div key={skill.key} className="form-group">
                <label>{skill.label}</label>
                <SkillLevelSelector
                  value={formData.skillLevels[skill.key as keyof SkillLevels]}
                  onChange={(value) => handleSkillLevelChange(skill.key as keyof SkillLevels, value)}
                />
              </div>
            ))}

            <div className="onboarding-summary">
              <h4>Summary</h4>
              <div className="summary-grid">
                <div><strong>Age:</strong> {formData.age || 'Not set'}</div>
                <div><strong>Career Stage:</strong> {careerStages.find(s => s.value === formData.careerStage)?.label || 'Not set'}</div>
                <div><strong>Career Path:</strong> {careerPaths.find(p => p.value === formData.careerPath)?.label || 'Not set'}</div>
                <div><strong>Tools:</strong> {formData.tools.length > 0 ? formData.tools.join(', ') : 'None'}</div>
                <div><strong>Languages:</strong> {formData.developmentLanguages.length > 0 ? formData.developmentLanguages.join(', ') : 'None'}</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <span className="step-counter">{step} / 3</span>
        </div>

        <div className="onboarding-content">
          {renderStep()}
        </div>

        <div className="onboarding-footer">
          <button className="next-btn" onClick={handleNext}>
            {step === 3 ? 'Finish Setup' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
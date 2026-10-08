import React, { useState } from 'react';
import { ArrowLeft, Check, User, Briefcase, Code, Star } from 'lucide-react';
import { CareerStage, CareerPath, SkillLevels } from '../../types';
import { SkillLevelSelector } from '../Onboarding/SkillLevelSelector';
import './EditProfile.css';

interface EditProfileProps {
  onSave: () => void;
  onBack: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ onSave, onBack }) => {
  const savedData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [formData, setFormData] = useState({
    name: user.name || '',
    age: savedData.age || '',
    careerStage: (savedData.careerStage || '') as CareerStage,
    careerPath: (savedData.careerPath || '') as CareerPath,
    tools: savedData.tools || [],
    developmentLanguages: savedData.developmentLanguages || [],
    skillLevels: savedData.skillLevels || {
      problemSolving: 0,
      communication: 0,
      technicalSkills: 0,
      leadership: 0,
      adaptability: 0
    } as SkillLevels
  });

  const [currentTool, setCurrentTool] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [saved, setSaved] = useState(false);

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
      setFormData(prev => ({ ...prev, tools: [...prev.tools, currentTool.trim()] }));
      setCurrentTool('');
    }
  };

  const removeTool = (tool: string) => {
    setFormData(prev => ({ ...prev, tools: prev.tools.filter((t: string) => t !== tool) }));
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
      developmentLanguages: prev.developmentLanguages.filter((l: string) => l !== language) 
    }));
  };

  const handleSkillLevelChange = (key: keyof SkillLevels, value: number) => {
    setFormData(prev => ({
      ...prev,
      skillLevels: { ...prev.skillLevels, [key]: value }
    }));
  };

  const handleSave = () => {
    // Update user name
    const updatedUser = { ...user, name: formData.name };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update onboarding data
    const { name, ...onboardingData } = formData;
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

    setSaved(true);
    setTimeout(() => {
      onSave();
    }, 1000);
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <header className="edit-header">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h1>Edit Profile</h1>
          <div style={{ width: 40 }}></div>
        </header>

        <div className="edit-content">
          {/* Personal Info */}
          <div className="edit-section">
            <h3><User size={20} /> Personal Info</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Your age"
                className="edit-input"
              />
            </div>
          </div>

          {/* Career */}
          <div className="edit-section">
            <h3><Briefcase size={20} /> Career</h3>
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

          {/* Tools & Languages */}
          <div className="edit-section">
            <h3><Code size={20} /> Tools & Languages</h3>
            <div className="form-group">
              <label>Tools</label>
              <div className="input-tag-wrapper">
                <input
                  type="text"
                  value={currentTool}
                  onChange={(e) => setCurrentTool(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTool()}
                  placeholder="Add a tool"
                  className="edit-input"
                />
                <button type="button" onClick={addTool} className="add-tag-btn">
                  <Check size={16} />
                </button>
              </div>
              <div className="tags-container">
                {formData.tools.map((tool: string) => (
                  <span key={tool} className="tag">
                    {tool}
                    <button onClick={() => removeTool(tool)} className="remove-tag">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Development Languages</label>
              <div className="input-tag-wrapper">
                <input
                  type="text"
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  placeholder="Add a language"
                  className="edit-input"
                />
                <button type="button" onClick={addLanguage} className="add-tag-btn">
                  <Check size={16} />
                </button>
              </div>
              <div className="tags-container">
                {formData.developmentLanguages.map((language: string) => (
                  <span key={language} className="tag">
                    {language}
                    <button onClick={() => removeLanguage(language)} className="remove-tag">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="edit-section">
            <h3><Star size={20} /> Skills</h3>
            {skillCategories.map((skill) => (
              <div key={skill.key} className="form-group">
                <label>{skill.label}</label>
                <SkillLevelSelector
                  value={formData.skillLevels[skill.key as keyof SkillLevels]}
                  onChange={(value) => handleSkillLevelChange(skill.key as keyof SkillLevels, value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="edit-footer">
          <button className="save-btn" onClick={handleSave}>
            {saved ? (
              <>
                <Check size={20} /> Saved!
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Mic, Send, StopCircle, ArrowLeft } from 'lucide-react';
import './InterviewPage.css';

interface Message {
  id: string;
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: Date;
}

interface InterviewPageProps {
  onEnd: () => void;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({ onEnd }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const questionBank = [
    "Tell me about yourself and why you're interested in this internship.",
    "What programming languages are you most comfortable with?",
    "Describe a challenging project you worked on.",
    "How do you handle tight deadlines and pressure?",
    "Where do you see yourself in 5 years?"
  ];

  const startInterview = () => {
    setInterviewStarted(true);
    addMessage('interviewer', questionBank[0]);
  };

  const addMessage = (role: 'interviewer' | 'candidate', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendAnswer = () => {
    if (!userAnswer.trim()) return;

    setIsProcessing(true);
    addMessage('candidate', userAnswer);

    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < questionBank.length) {
        setQuestionIndex(nextIndex);
        addMessage('interviewer', questionBank[nextIndex]);
      } else {
        addMessage('interviewer', "Thank you for your time! This concludes our interview. You'll receive feedback shortly! 🎉");
      }
      setIsProcessing(false);
      setUserAnswer('');
    }, 1500);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        if (isRecording) {
          setUserAnswer(prev => prev + " This is a simulated voice input.");
          setIsRecording(false);
        }
      }, 3000);
    }
  };

  const isComplete = questionIndex >= questionBank.length - 1 && messages.filter(m => m.role === 'candidate').length >= questionBank.length;

  return (
    <div className="interview-page">
      <div className="interview-container">
        <header className="interview-header">
          <button className="back-btn" onClick={onEnd}>
            <ArrowLeft size={24} />
          </button>
          <div className="header-content">
            <h1>🎯 Mock Interview</h1>
            <p>Practice with our AI interviewer</p>
          </div>
        </header>

        {!interviewStarted ? (
          <div className="interview-start">
            <div className="start-card">
              <h2>Ready to Begin?</h2>
              <p>You'll be asked 5 interview questions. Take your time and answer naturally.</p>
              <ul className="interview-tips">
                <li>🎙️ Speak clearly</li>
                <li>💡 Think before you answer</li>
                <li>📝 Be specific with examples</li>
              </ul>
              <button className="start-interview-btn" onClick={startInterview}>
                Start Interview
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-bubble ${message.role}`}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="message-bubble interviewer">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              {isComplete && (
                <div className="complete-message">
                  <button className="end-interview-btn" onClick={onEnd}>
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>

            {!isComplete && (
              <>
                <div className="input-area">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer or use the mic..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendAnswer()}
                      disabled={isProcessing}
                    />
                    <button
                      className={`mic-btn ${isRecording ? 'recording' : ''}`}
                      onClick={toggleRecording}
                      disabled={isProcessing}
                    >
                      {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
                    </button>
                    <button
                      className="send-btn"
                      onClick={handleSendAnswer}
                      disabled={!userAnswer.trim() || isProcessing}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <div className="input-hint">
                    {isRecording ? '🔴 Recording... Speak your answer' : '💬 Type or click mic to speak'}
                  </div>
                </div>

                <div className="interview-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${((questionIndex + 1) / questionBank.length) * 100}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    Question {questionIndex + 1} of {questionBank.length}
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
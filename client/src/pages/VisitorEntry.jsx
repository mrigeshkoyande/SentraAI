import { useState, useRef, useEffect } from 'react';
import {
  Camera, User, Phone, MapPin, FileText, Shield, Zap,
  CheckCircle, XCircle, Loader, ScanLine, Upload, RefreshCw
} from 'lucide-react';
import { VISITOR_NAMES, PURPOSES, UNITS, VISITOR_PHOTOS, generateTrustScore, getTrustColor } from '../data/mockData';
import VisitorPass from '../components/VisitorPass';
import './VisitorEntry.css';

export default function VisitorEntry() {
  const [step, setStep] = useState(1); // 1=form, 2=scanning, 3=result
  const [formData, setFormData] = useState({
    name: '', phone: '', purpose: '', unit: '', photo: null,
  });
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      // Camera not available, use demo mode
      setCapturedPhoto(VISITOR_PHOTOS[Math.floor(Math.random() * VISITOR_PHOTOS.length)]);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedPhoto(dataUrl);
      // Stop camera
      const stream = videoRef.current.srcObject;
      if (stream) stream.getTracks().forEach(t => t.stop());
      setCameraActive(false);
    } else {
      // Demo fallback
      setCapturedPhoto(VISITOR_PHOTOS[Math.floor(Math.random() * VISITOR_PHOTOS.length)]);
      setCameraActive(false);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep(2);
    setScanning(true);
    setScanProgress(0);

    // Simulate AI scanning
    const steps = [
      { progress: 15, label: 'Initializing face detection...' },
      { progress: 35, label: 'Analyzing facial features...' },
      { progress: 55, label: 'Matching against database...' },
      { progress: 75, label: 'Running anomaly detection...' },
      { progress: 90, label: 'Generating trust score...' },
      { progress: 100, label: 'Analysis complete!' },
    ];

    for (const s of steps) {
      await new Promise(r => setTimeout(r, 600));
      setScanProgress(s.progress);
    }

    await new Promise(r => setTimeout(r, 400));

    const trust = generateTrustScore();
    const faceMatch = Math.floor(Math.random() * 15) + 85;
    setResult({
      visitor: formData.name || 'Unknown Visitor',
      photo: capturedPhoto || VISITOR_PHOTOS[0],
      trustScore: trust.score,
      trustLevel: trust.level,
      faceMatch,
      status: trust.level === 'High' ? 'denied' : 'approved',
      verificationMethod: 'Face ID + OTP',
      otp: Math.floor(100000 + Math.random() * 900000),
      anomalies: trust.level === 'High' ? ['Face mismatch detected', 'Previously flagged visitor'] :
        trust.level === 'Medium' ? ['Unusual visit time'] : [],
    });
    setScanning(false);
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ name: '', phone: '', purpose: '', unit: '', photo: null });
    setCapturedPhoto(null);
    setResult(null);
    setScanProgress(0);
  };

  return (
    <div className="visitor-entry-page">
      {/* Progress Steps */}
      <div className="entry-steps">
        <div className={`entry-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-number">{step > 1 ? <CheckCircle size={16} /> : '1'}</div>
          <span>Visitor Info</span>
        </div>
        <div className="step-connector" />
        <div className={`entry-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-number">{step > 2 ? <CheckCircle size={16} /> : '2'}</div>
          <span>AI Scan</span>
        </div>
        <div className="step-connector" />
        <div className={`entry-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Result</span>
        </div>
      </div>

      <div className="entry-content">
        {/* Step 1: Form */}
        {step === 1 && (
          <div className="entry-form-section animate-fade-in-up">
            <div className="entry-form-card">
              <div className="form-card-header">
                <div className="form-icon-wrapper">
                  <User size={20} />
                </div>
                <div>
                  <h2>Register Visitor</h2>
                  <p>Fill in the visitor details and capture photo</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="visitor-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="visitor-name">Full Name</label>
                    <div className="field-input">
                      <User size={16} />
                      <input
                        id="visitor-name"
                        type="text"
                        placeholder="Enter visitor name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="visitor-phone">Phone Number</label>
                    <div className="field-input">
                      <Phone size={16} />
                      <input
                        id="visitor-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="visitor-purpose">Purpose of Visit</label>
                    <div className="field-input">
                      <FileText size={16} />
                      <select
                        id="visitor-purpose"
                        value={formData.purpose}
                        onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                        required
                      >
                        <option value="">Select purpose</option>
                        {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="visitor-unit">Destination Unit</label>
                    <div className="field-input">
                      <MapPin size={16} />
                      <select
                        id="visitor-unit"
                        value={formData.unit}
                        onChange={e => setFormData({ ...formData, unit: e.target.value })}
                        required
                      >
                        <option value="">Select unit</option>
                        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Camera Section */}
                <div className="camera-section">
                  <label>Face Capture</label>
                  <div className="camera-container">
                    {!cameraActive && !capturedPhoto && (
                      <div className="camera-placeholder">
                        <Camera size={40} />
                        <p>Capture visitor's face for AI verification</p>
                        <div className="camera-buttons">
                          <button type="button" className="camera-btn primary" onClick={startCamera} id="start-camera">
                            <Camera size={16} />
                            Open Camera
                          </button>
                          <button type="button" className="camera-btn secondary"
                            onClick={() => setCapturedPhoto(VISITOR_PHOTOS[Math.floor(Math.random() * VISITOR_PHOTOS.length)])}
                            id="use-demo-photo"
                          >
                            <Upload size={16} />
                            Use Demo Photo
                          </button>
                        </div>
                      </div>
                    )}

                    {cameraActive && (
                      <div className="camera-active">
                        <video ref={videoRef} autoPlay playsInline className="camera-video" />
                        <div className="camera-overlay">
                          <div className="face-guide" />
                          <div className="scan-line-anim" />
                        </div>
                        <button type="button" className="capture-btn" onClick={capturePhoto} id="capture-btn">
                          <div className="capture-ring" />
                        </button>
                      </div>
                    )}

                    {capturedPhoto && (
                      <div className="captured-preview">
                        <img src={capturedPhoto} alt="Captured" />
                        <div className="captured-overlay">
                          <CheckCircle size={24} />
                          <span>Photo Captured</span>
                        </div>
                        <button type="button" className="retake-btn" onClick={retakePhoto} id="retake-btn">
                          <RefreshCw size={14} />
                          Retake
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <canvas ref={canvasRef} style={{ display: 'none' }} />

                <button type="submit" className="submit-entry-btn" id="submit-visitor" disabled={!capturedPhoto}>
                  <Shield size={18} />
                  Start AI Verification
                  <Zap size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: AI Scanning */}
        {step === 2 && (
          <div className="scanning-section animate-fade-in-up">
            <div className="scan-card">
              <div className="scan-visual">
                <div className="scan-photo-wrapper">
                  <img src={capturedPhoto || VISITOR_PHOTOS[0]} alt="Scanning" className="scan-photo" />
                  <div className="scan-overlay-anim">
                    <div className="scan-line" />
                  </div>
                  <div className="scan-corners">
                    <span /><span /><span /><span />
                  </div>
                </div>
              </div>

              <div className="scan-progress-section">
                <div className="scan-progress-bar">
                  <div className="scan-progress-fill" style={{ width: `${scanProgress}%` }} />
                </div>
                <p className="scan-status-text">
                  {scanProgress < 15 ? 'Initializing face detection...' :
                    scanProgress < 35 ? 'Analyzing facial features...' :
                    scanProgress < 55 ? 'Matching against database...' :
                    scanProgress < 75 ? 'Running anomaly detection...' :
                    scanProgress < 100 ? 'Generating trust score...' :
                    'Analysis complete!'}
                </p>
                <span className="scan-percent">{scanProgress}%</span>
              </div>

              <div className="scan-indicators">
                <div className={`scan-indicator ${scanProgress >= 15 ? 'active' : ''}`}>
                  <Camera size={14} />
                  <span>Face Detection</span>
                </div>
                <div className={`scan-indicator ${scanProgress >= 35 ? 'active' : ''}`}>
                  <ScanLine size={14} />
                  <span>Feature Analysis</span>
                </div>
                <div className={`scan-indicator ${scanProgress >= 55 ? 'active' : ''}`}>
                  <Shield size={14} />
                  <span>Database Match</span>
                </div>
                <div className={`scan-indicator ${scanProgress >= 75 ? 'active' : ''}`}>
                  <Zap size={14} />
                  <span>Anomaly Check</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <div className="result-section animate-fade-in-up">
            <div className={`result-card ${result.status}`}>
              <div className="result-status-banner">
                {result.status === 'approved' ? (
                  <>
                    <CheckCircle size={32} />
                    <h2>Access Approved</h2>
                    <p>Visitor verification successful</p>
                  </>
                ) : (
                  <>
                    <XCircle size={32} />
                    <h2>Access Denied</h2>
                    <p>High risk visitor detected</p>
                  </>
                )}
              </div>

              <div className="result-details">
                <div className="result-photo">
                  <img src={result.photo} alt={result.visitor} />
                </div>

                <div className="result-info-grid">
                  <div className="result-field">
                    <span className="field-label">Visitor</span>
                    <span className="field-value">{result.visitor}</span>
                  </div>
                  <div className="result-field">
                    <span className="field-label">Face Match</span>
                    <span className="field-value">{result.faceMatch}%</span>
                  </div>
                  <div className="result-field">
                    <span className="field-label">Trust Score</span>
                    <span className="field-value" style={{ color: getTrustColor(result.trustLevel).color }}>
                      {result.trustScore}/100 ({result.trustLevel} Risk)
                    </span>
                  </div>
                  <div className="result-field">
                    <span className="field-label">Verification</span>
                    <span className="field-value">{result.verificationMethod}</span>
                  </div>
                  {result.status === 'approved' && (
                    <div className="result-field otp-field">
                      <span className="field-label">OTP Code (sent to resident)</span>
                      <div className="otp-display">{String(result.otp).split('').map((d, i) => (
                        <span key={i} className="otp-digit">{d}</span>
                      ))}</div>
                    </div>
                  )}
                </div>

                {result.anomalies.length > 0 && (
                  <div className="anomaly-section">
                    <h4>⚠️ Anomalies Detected</h4>
                    {result.anomalies.map((a, i) => (
                      <div key={i} className="anomaly-item">
                        <XCircle size={14} />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="result-actions">
                <button className="result-btn primary" onClick={resetForm} id="new-entry">
                  <Camera size={16} />
                  New Entry
                </button>
                <button className="result-btn secondary" id="print-pass" onClick={() => setShowPass(true)}>
                  <FileText size={16} />
                  Print Visitor Pass
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visitor Pass Modal */}
      {showPass && result && (
        <VisitorPass
          result={result}
          formData={formData}
          onClose={() => setShowPass(false)}
        />
      )}
    </div>
  );
}

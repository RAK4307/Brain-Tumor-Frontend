import React, { useState } from 'react'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setOtpError('')
  }

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpError('');
    setResendSuccess(false);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setOtpError('');
      } else {
        setOtpError(data.message || 'Failed to send OTP.');
        setOtpSent(false);
      }
    } catch (err) {
      setOtpError('Server error. Please try again.');
      setOtpSent(false);
    }
  };

  const handleResendOtp = () => {
    // Simulate resend OTP (replace with API call)
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      setResendSuccess(true);
      // ...API to resend OTP...
      setTimeout(() => setResendSuccess(false), 3000);
    } else {
      setOtpError('Please enter a valid email address.');
    }
  };

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9A-Za-z]/g, '').slice(0, 1)
    const newOtp = [...otp]
    newOtp[idx] = value
    setOtp(newOtp)
    setOtpError('')
    // Auto-focus next input
    if (value && idx < otp.length - 1) {
      document.getElementById(`otp-input-${idx + 1}`).focus()
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.join('') })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setOtpError('');
      } else {
        setOtpError(data.message || 'OTP verification failed.');
      }
    } catch (err) {
      setOtpError('Server error. Please try again.');
    }
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
    setResetError('')
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setResetError('')
  }

  const handleTermsChange = (e) => {
    setAcceptTerms(e.target.checked)
    setResetError('')
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        setResetSuccess(true);
        setResetError('');
      } else {
        setResetError(data.message || 'Password reset failed.');
      }
    } catch (err) {
      setResetError('Server error. Please try again.');
    }
  }

  return (
    <div className='forgot-password-page'>
    <div className="forgot-password-container">
      <h2>Email Verification</h2>
      <div style={{ color: '#7b8a99', fontSize: '1.08rem', marginBottom: '2.2rem' }}>
        We have sent a code to your email
      </div>
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="forgot-password-form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
            required
          />
          <button type="submit">Send OTP</button>
          {otpError && <div className="forgot-password-error">{otpError}</div>}
        </form>
      ) : !success ? (
        <form onSubmit={handleVerifyOtp} className="forgot-password-form">
          <div className="otp-inputs-row">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, idx)}
                className="otp-input-box"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button type="submit">Verify Account</button>
          <div className="otp-resend-row">
            Didn't receive code? <button type="button" className="otp-resend-link" onClick={handleResendOtp}>Resend OTP</button>
          </div>
          {resendSuccess && (
            <div className="forgot-password-success" style={{marginTop: '1rem'}}>A new OTP has been sent to your email.</div>
          )}
          {otpError && <div className="forgot-password-error">{otpError}</div>}
        </form>
      ) : !resetSuccess ? (
        <form onSubmit={handleResetPassword} className="forgot-password-form">
          <h2 style={{marginBottom: '1.5rem'}}>Change Password</h2>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            required
          />
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            required
          />
          <div style={{display: 'flex', alignItems: 'center', margin: '1rem 0'}}>
            <input
              type="checkbox"
              id="accept-terms"
              checked={acceptTerms}
              onChange={handleTermsChange}
              style={{marginRight: '0.7rem'}}
            />
            <label htmlFor="accept-terms" style={{fontSize: '1rem', color: '#34495e'}}>
              I accept the <a href="/terms" style={{color: '#2563eb', textDecoration: 'underline'}}>Terms and Conditions</a>
            </label>
          </div>
          <button type="submit">Reset password</button>
          {resetError && <div className="forgot-password-error">{resetError}</div>}
        </form>
      ) : (
        <div className="forgot-password-success">
          Your password has been reset successfully!
        </div>
      )}
    </div>
    </div>
  )
}

export default ForgotPassword
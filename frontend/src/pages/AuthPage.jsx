import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login', 'register', 'whatsapp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = enter otp
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setErrorMsg(error.message);
    setLoading(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    if (mode === 'register') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) setErrorMsg(error.message);
      else {
        alert("Registration successful! You can now log in.");
        setMode('login');
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else navigate('/');
    }
    setLoading(false);
  };

  const handleWhatsAppSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'whatsapp' }
    });
    
    if (error) {
      setErrorMsg(error.message + " (Note: WhatsApp requires Twilio config in Supabase)");
    } else {
      setStep(2);
    }
    setLoading(false);
  };

  const handleWhatsAppVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'whatsapp'
    });
    if (error) setErrorMsg(error.message);
    else navigate('/');
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: 'var(--space-12) 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'var(--bg-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-default)', width: '100%', maxWidth: '450px' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create an Account' : 'WhatsApp Login'}
        </h2>

        {errorMsg && <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', border: '1px solid rgba(239,68,68,0.3)', fontSize: '0.9rem' }}>{errorMsg}</div>}

        {/* ── GOOGLE AUTH ── */}
        <button onClick={handleGoogleSignIn} disabled={loading} className="btn btn-outline" style={{ width: '100%', padding: '1rem', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: 'var(--space-4) 0', color: 'var(--text-muted)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }}></div>
          <span style={{ padding: '0 10px', fontSize: '0.85rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }}></div>
        </div>

        {/* ── EMAIL / PASSWORD AUTH ── */}
        {(mode === 'login' || mode === 'register') && (
          <form onSubmit={handleEmailAuth}>
            {mode === 'register' && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Full Name</label>
                <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="John Doe" />
              </div>
            )}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="your@email.com" />
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="••••••••" />
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: 'var(--space-4)' }}>
              {mode === 'login' ? 'Sign In with Email' : 'Create Account'}
            </button>
          </form>
        )}

        {/* ── WHATSAPP AUTH ── */}
        {mode === 'whatsapp' && (
          <div>
            {step === 1 ? (
              <form onSubmit={handleWhatsAppSendOTP}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>WhatsApp Number (with country code)</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="+919876543210" />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', background: '#16a34a', border: 'none', marginBottom: 'var(--space-4)' }}>
                  Send WhatsApp Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleWhatsAppVerifyOTP}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Enter 6-digit OTP</label>
                  <input type="text" required value={otp} onChange={e => setOtp(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="123456" />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', background: '#16a34a', border: 'none', marginBottom: 'var(--space-4)' }}>
                  Verify & Login
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── MODE TOGGLES ── */}
        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mode !== 'login' && <div style={{ cursor: 'pointer', color: 'var(--brand-primary)' }} onClick={() => {setMode('login'); setStep(1);}}>Already have an account? Sign In</div>}
          {mode !== 'register' && <div style={{ cursor: 'pointer', color: 'var(--brand-primary)' }} onClick={() => {setMode('register'); setStep(1);}}>Don't have an account? Sign Up</div>}
          {mode !== 'whatsapp' && <div style={{ cursor: 'pointer', color: '#10b981' }} onClick={() => setMode('whatsapp')}>Login with WhatsApp instead</div>}
        </div>

      </div>
    </div>
  );
}

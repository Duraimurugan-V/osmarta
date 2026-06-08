import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      full_name: contactForm.fullName,
      email: contactForm.email,
      mobile_number: contactForm.mobile,
      subject: contactForm.subject,
      message: contactForm.message
    };

    const { error } = await supabase.from('contact_messages').insert([payload]);
    
    if (error) {
      alert("Failed to send message: " + error.message);
    } else {
      alert("Message sent successfully! We will get back to you soon.");
      setContactForm({ fullName: '', email: '', mobile: '', subject: '', message: '' });
    }
  };
  return (
    <div className="home-page">
      
      {/* ── HERO ── */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-12) var(--space-6)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(124,58,237,0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(6,182,212,0.15), transparent 50%)', zIndex: -1 }}></div>
        
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd', fontWeight: 600, fontSize: '0.85rem', marginBottom: 'var(--space-6)', background: 'rgba(124,58,237,0.1)' }}>
            🌱 Empowering Tamil Nadu Local Businesses
          </div>
          
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 'var(--space-6)' }}>
            Connect Directly with<br/>
            <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Local Providers</span>
          </h1>
          
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
            No commission. No middlemen. Just direct WhatsApp and Phone connections between buyers and verified local farmers, retailers, and service providers.
          </p>
          
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }}>Explore Listings</Link>
            <Link to="/share-listing" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)' }}>Post a Listing</Link>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-12)' }}>
            <div style={{ background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>0%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Commission</div>
            </div>
            <div style={{ background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>38+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Districts</div>
            </div>
            <div style={{ background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>Direct</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Connections</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: 'var(--space-12) 0', background: 'var(--bg-elevated)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>How OSMARTA Works</h2>
            <p style={{ color: 'var(--text-secondary)' }}>A transparent ecosystem designed for fair trade.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
            <div style={{ background: 'var(--bg-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ marginBottom: '1rem' }}>1. Find</h3>
              <p style={{ color: 'var(--text-muted)' }}>Browse categories to find local farmers, products, food, or services near you.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ marginBottom: '1rem' }}>2. Connect</h3>
              <p style={{ color: 'var(--text-muted)' }}>Get direct access to their phone number and WhatsApp details instantly.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
              <h3 style={{ marginBottom: '1rem' }}>3. Deal</h3>
              <p style={{ color: 'var(--text-muted)' }}>Negotiate and complete the transaction directly with the provider.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ padding: 'var(--space-12) 0', background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>FAQ</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Got Questions? We've Got Answers.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {[
              "What is OSMARTA and how does it work?",
              "Is OSMARTA free to use for customers?",
              "How do farmers benefit from OSMARTA?",
              "How does the AI recommendation system work?",
              "Is my data safe on OSMARTA?"
            ].map((q, idx) => (
              <details key={idx} style={{ background: 'var(--bg-card)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span>+</span>
                </summary>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
                  Our team is actively updating this information. OSMARTA is a direct connection ecosystem eliminating middlemen and using AI to forecast demand.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <section style={{ padding: 'var(--space-12) 0', background: 'var(--bg-elevated)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We're Here to Help You Grow</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>Contact Information</h3>
              
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', background: 'var(--glass-bg)', padding: '12px', borderRadius: '50%' }}>📞</div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Phone</div>
                  <div style={{ fontWeight: 600 }}>+91 9843602332</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', background: 'var(--glass-bg)', padding: '12px', borderRadius: '50%' }}>📧</div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email</div>
                  <div style={{ fontWeight: 600 }}>supportosmartaa@gmail.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', background: 'var(--glass-bg)', padding: '12px', borderRadius: '50%' }}>📍</div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Corporate Office</div>
                  <div style={{ fontWeight: 600 }}>Salem, Tamil Nadu, India</div>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <h4 style={{ marginBottom: 'var(--space-4)' }}>Quick Connect</h4>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <a href="https://wa.me/919843602332" target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#16a34a', color: 'white' }}>WhatsApp</a>
                  <button className="btn btn-sm btn-outline">💬 Live Chat</button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'var(--bg-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-default)' }}>
              <h3 style={{ marginBottom: 'var(--space-6)' }}>Send Us a Message</h3>
              <form onSubmit={handleContactSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                    <input required type="text" value={contactForm.fullName} onChange={e => setContactForm({...contactForm, fullName: e.target.value})} placeholder="Your full name" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email *</label>
                    <input required type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} placeholder="your@email.com" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mobile Number *</label>
                    <input required type="tel" value={contactForm.mobile} onChange={e => setContactForm({...contactForm, mobile: e.target.value})} placeholder="+91 xxxxxxxxxx" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Subject *</label>
                    <select required value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }}>
                      <option value="">Select a subject</option>
                      <option value="support">Support</option>
                      <option value="sales">Sales</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Message *</label>
                  <textarea required value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} placeholder="Tell us how we can help you..." style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white', minHeight: '100px' }}></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: 'var(--space-2)' }}>Send Message</button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>By submitting, you agree to our Privacy Policy.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a0a14', padding: 'var(--space-12) 0 var(--space-6)', borderTop: '1px solid var(--border-default)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '2rem', marginBottom: 'var(--space-2)' }}>
            OS<span style={{ color: '#10b981' }}>MART</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto var(--space-6)' }}>
            AI-Powered Digital Commerce Ecosystem. Connecting Tamil Nadu's commerce with global technology.
          </p>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
            📞 +91 9843602332
          </div>
          <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 'var(--space-6)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            &copy; 2026 OSMARTA. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

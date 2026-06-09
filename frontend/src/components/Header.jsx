import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="site-header scrolled" id="site-header">
      <div className="header-inner container">
        <Link to="/" className="header-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.jpg" alt="OSMARTA" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
        </Link>
        <div className="header-search">
          <div className="search-wrapper">
            <input type="text" placeholder="Search..." aria-label="Search" />
            <button className="search-submit-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </div>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="action-btn theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user.user_metadata?.full_name}</span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">Log Out</button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <LogIn size={16} /> Sign In
            </Link>
          )}
        </div>
      </div>
      <nav className="header-nav">
        <div className="container">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link active">Home</Link></li>
            <li><Link to="/products" className="nav-link">Products</Link></li>
            <li><Link to="/ai-features" className="nav-link nav-ai" style={{display: 'flex', alignItems: 'center', gap: '4px'}}><span className="ai-pulse"></span> AI Features</Link></li>
            <li><Link to="/reviews" className="nav-link">Reviews</Link></li>
            <li><Link to="/share-listing" className="nav-link">Share Listing</Link></li>
            <li><Link to="/owner-inbox" className="nav-link">Owner Inbox</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CommunityReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // New review form
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewType, setReviewType] = useState('platform'); // 'platform' or 'personal'
  const [location, setLocation] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:reviewer_id (full_name),
        listings:listing_id (title, category)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please sign in to write a review!");
    
    const payload = {
      reviewer_id: user.id, 
      rating: parseInt(rating), 
      review_text: text,
      review_type: reviewType,
      location,
      contact_details: contactDetails,
      image_url: imageUrl
    };

    const { error } = await supabase.from('reviews').insert([payload]);

    if (!error) {
      alert("Review posted!");
      setText(''); setRating(5); setReviewType('platform'); setLocation(''); setContactDetails(''); setImageUrl('');
      loadReviews(); 
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>🌟 Community Voice</h1>
      
      {/* Post Review Form */}
      <div style={{ maxWidth: '700px', margin: '0 auto var(--space-12)', background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-default)' }}>
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Share Your Experience</h3>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Review Type</label>
              <select value={reviewType} onChange={e => setReviewType(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }}>
                <option value="platform">Product / Service Review</option>
                <option value="personal">Personal Experience Sharing</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Rating (1-5)</label>
              <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Review Text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', minHeight: '80px', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder={reviewType === 'personal' ? "Share your personal experience with OSMART..." : "Tell us about the product/service..."} />
          </div>

          <div style={{ marginBottom: 'var(--space-4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="E.g., Chennai" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Contact Details (Optional)</label>
              <input type="text" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="Phone/Email" />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Image URL (Optional)</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="https://..." />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Post Review</button>
        </form>
      </div>

      {/* Reviews Grid */}
      {loading ? <p style={{ textAlign: 'center' }}>Loading reviews...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
          {reviews.map(r => (
            <div key={r.id} className="review-card" style={{ background: 'var(--glass-bg)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '99px', background: r.review_type === 'personal' ? 'rgba(124,58,237,0.2)' : 'rgba(16,185,129,0.2)', color: r.review_type === 'personal' ? '#a78bfa' : '#10b981' }}>
                  {r.review_type === 'personal' ? '🗣️ Personal Experience' : '🛍️ Platform Review'}
                </span>
                <div style={{ color: '#FBBF24', letterSpacing: '2px' }}>
                  {'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}
                </div>
              </div>

              {r.image_url && <img src={r.image_url} alt="Review" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }} />}
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0 0 var(--space-4)', flex: 1 }}>"{r.review_text}"</p>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{r.profiles?.full_name || 'Anonymous User'}</strong>
                {r.location && <div>📍 {r.location}</div>}
                {r.contact_details && <div>📞 {r.contact_details}</div>}
                {r.listings?.title && <div style={{ marginTop: '4px', color: 'var(--brand-primary)' }}>Related: {r.listings.title}</div>}
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p>No reviews yet.</p>}
        </div>
      )}
    </div>
  );
}

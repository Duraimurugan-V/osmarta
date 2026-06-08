import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function OwnerInbox() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user);
        loadInquiries(data.user.id);
      } else {
        setLoading(false);
      }
    });
  }, []);

  async function loadInquiries(sellerId) {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select(`
        *,
        buyer:buyer_id (full_name, location_area, phone_number),
        listings:listing_id (title)
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInquiries(data);
    }
    setLoading(false);
  }

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('inquiries')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      // Optimistic update
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    } else {
      alert("Error: " + error.message);
    }
  };

  if (!user) {
    return <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>Please sign in to view your inbox.</div>;
  }

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', background: 'linear-gradient(135deg, #0f0f23, #1a1a3e)', borderRadius: 'var(--radius-2xl)', marginBottom: 'var(--space-8)' }}>
        <h1 style={{ margin: 0 }}>📬 Owner Request Inbox</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review and respond to customer inquiries.</p>
      </div>

      {loading ? <p>Loading your inquiries...</p> : inquiries.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>You have no inquiries yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {inquiries.map(inq => (
            <div key={inq.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--glass-bg)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)' }}>
              <div>
                <h4 style={{ margin: '0 0 var(--space-1)' }}>{inq.listings?.title || 'Unknown Item'}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  From: <strong>{inq.buyer?.full_name || 'Anonymous'}</strong> ({inq.buyer?.location_area || 'Unknown Area'})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>"{inq.message || 'I am interested in this listing.'}"</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', background: inq.status === 'pending' ? 'rgba(245,158,11,0.2)' : inq.status === 'approved' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: inq.status === 'pending' ? '#f59e0b' : inq.status === 'approved' ? '#10b981' : '#ef4444' }}>
                  {inq.status.toUpperCase()}
                </span>
                
                {inq.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleUpdateStatus(inq.id, 'approved')} className="btn btn-sm" style={{ background: '#10b981', color: 'white' }}>Approve</button>
                    <button onClick={() => handleUpdateStatus(inq.id, 'rejected')} className="btn btn-sm btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }}>Reject</button>
                  </div>
                )}
                
                {inq.status === 'approved' && inq.buyer?.phone_number && (
                  <a href={`tel:${inq.buyer.phone_number}`} className="btn btn-sm btn-glass">📞 Call Buyer</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

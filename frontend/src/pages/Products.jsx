import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      let query = supabase.from('listings').select(`*, profiles(full_name, location_area, phone_number, whatsapp_number)`);
      
      if (filter !== 'all') {
        query = query.eq('category', filter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    loadProducts();
  }, [filter]);

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>Marketplace Directory</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', background: 'var(--bg-elevated)', border: '1px solid var(--border-brand)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          <option value="all">🌐 All Listings</option>
          <option value="product">🛍️ Products</option>
          <option value="farm">🥬 Farm Produce</option>
          <option value="food">🍛 Food & Catering</option>
          <option value="service">🔧 Services</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading directory...</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ marginBottom: '1rem' }}>No listings found in this category.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Be the first to list your offering!</p>
          <Link to="/share-listing" className="btn btn-primary">Create a Listing</Link>
        </div>
      ) : (
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {products.map(p => (
            <div key={p.id} className="card" style={{ background: 'var(--bg-card)', padding: 'var(--space-5)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column' }}>
              
              {p.image_url && (
                <div style={{ marginBottom: '1rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '180px' }}>
                  <img src={p.image_url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{p.title}</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', textTransform: 'capitalize' }}>
                  {p.category}
                </span>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', flex: 1 }}>{p.description}</p>
              
              <div style={{ background: 'var(--bg-elevated)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price Reference</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--brand-primary)', fontSize: '1.1rem' }}>₹{p.price}</span>
                </div>
                {p.category === 'service' ? (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🕒 {p.availability_time || 'Check availability'}</div>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>📦 {p.stock_info || 'In Stock'}</div>
                )}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ background: 'var(--gradient-primary)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '10px' }}>
                    {p.profiles?.full_name ? p.profiles.full_name.substring(0, 2).toUpperCase() : 'AN'}
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{p.profiles?.full_name || 'Anonymous Seller'}</strong>
                </div>
                <div style={{ marginBottom: '12px' }}>📍 {p.profiles?.location_area || 'Local Area'}</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {(p.contact_phone || p.profiles?.phone_number) && (
                    <a href={`tel:${p.contact_phone || p.profiles.phone_number}`} className="btn btn-sm" style={{ background: 'linear-gradient(135deg,#059669,#10b981)', color: 'white', padding: '8px', textAlign: 'center', borderRadius: '8px' }}>📞 Call</a>
                  )}
                  {(p.contact_whatsapp || p.profiles?.whatsapp_number) && (
                    <a href={`https://wa.me/${p.contact_whatsapp || p.profiles.whatsapp_number}`} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: 'white', padding: '8px', textAlign: 'center', borderRadius: '8px' }}>💬 WhatsApp</a>
                  )}
                  {!p.contact_phone && !p.contact_whatsapp && !p.profiles?.phone_number && (
                    <button className="btn btn-sm btn-outline" style={{ gridColumn: 'span 2' }}>📨 Send Request</button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

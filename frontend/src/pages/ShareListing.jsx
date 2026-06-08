import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ShareListing() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('product');
  const [stockInfo, setStockInfo] = useState('');
  const [availabilityTime, setAvailabilityTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactWhatsapp, setContactWhatsapp] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in first!");
      return;
    }
    const payload = { 
      seller_id: user.id, 
      title, 
      description: desc, 
      price: parseFloat(price), 
      category,
      image_url: imageUrl,
      contact_phone: contactPhone,
      contact_whatsapp: contactWhatsapp,
      stock_info: category === 'service' ? null : stockInfo,
      availability_time: category === 'service' ? availabilityTime : null
    };

    const { error } = await supabase.from('listings').insert([payload]);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Listing published successfully!");
      setTitle(''); setDesc(''); setPrice(''); setStockInfo(''); setAvailabilityTime('');
      setImageUrl(''); setContactPhone(''); setContactWhatsapp('');
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>🚀 Share Your Listing</h1>
      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)' }}>
        
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }}>
            <option value="product">🛍️ Product</option>
            <option value="farm">🥬 Farm Produce</option>
            <option value="food">🍛 Food</option>
            <option value="service">🔧 Service</option>
          </select>
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Title</label>
          <input required type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="E.g., Organic Alphonso Mangoes" />
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Description</label>
          <textarea required value={desc} onChange={e => setDesc(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', minHeight: '100px', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="Describe your offering..." />
        </div>

        {category === 'service' ? (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Availability Time</label>
            <input required type="text" value={availabilityTime} onChange={e => setAvailabilityTime(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="E.g., Mon-Sat 9am to 6pm" />
          </div>
        ) : (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Stock Availability</label>
            <input required type="text" value={stockInfo} onChange={e => setStockInfo(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="E.g., 50 kg available" />
          </div>
        )}

        <div style={{ marginBottom: 'var(--space-4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Reference Price (₹)</label>
            <input required type="number" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="999" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Image URL (Optional)</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="https://..." />
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Contact Phone</label>
            <input required type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="+91..." />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>WhatsApp (Optional)</label>
            <input type="tel" value={contactWhatsapp} onChange={e => setContactWhatsapp(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} placeholder="Same as phone..." />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>🚀 Publish Listing</button>
      </form>
    </div>
  );
}

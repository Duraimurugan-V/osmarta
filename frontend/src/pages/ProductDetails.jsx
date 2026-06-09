import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from('listings')
        .select(`*, profiles(full_name, location_area, phone_number, whatsapp_number)`)
        .eq('id', id)
        .single();
      if (!error && data) setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const handleEnquire = async (listingId, sellerId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please sign in to send an enquiry.");
      return;
    }
    const message = prompt("Enter your enquiry message for the seller:");
    if (!message) return;

    const { error } = await supabase.from('inquiries').insert([{
      listing_id: listingId,
      buyer_id: user.id,
      seller_id: sellerId,
      message: message
    }]);

    if (error) alert("Error sending enquiry: " + error.message);
    else alert("Enquiry sent successfully! The seller will review it in their Owner Inbox.");
  };

  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Product not found.</div>;

  const images = (product.image_urls?.length > 0) ? product.image_urls : (product.image_url ? [product.image_url] : []);

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/products" style={{ color: 'var(--brand-primary)', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-6)' }}>&larr; Back to Listings</Link>
      
      <div style={{ background: 'var(--bg-card)', padding: 'var(--space-6)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-default)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>{product.title}</h1>
        <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-6)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', background: 'var(--bg-elevated)', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
            ₹{product.price}
          </span>
        </div>

        {images.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: images.length > 1 ? '2fr 1fr' : '1fr', gap: '8px', marginBottom: 'var(--space-6)' }}>
            <img src={images[0]} alt={product.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} />
            {images.length > 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '400px' }}>
                {images.slice(1).map((img, i) => (
                  <img key={i} src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
          <div style={{ flex: '2 1 400px' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Description</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{product.description}</p>
            
            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-5)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)' }}>Details</h4>
              <p style={{ marginBottom: '8px' }}><strong>Availability:</strong> {product.availability_time || product.stock_info || 'In Stock'}</p>
              <p style={{ marginBottom: '8px' }}><strong>Location:</strong> {product.profiles?.location_area || 'Local Area'}</p>
              {product.location_link && (
                <a href={product.location_link} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ marginTop: '8px', background: 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)', textDecoration: 'none', display: 'inline-block' }}>
                  📍 Open Location in Map
                </a>
              )}
            </div>
          </div>
          
          <div style={{ flex: '1 1 250px' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)' }}>Seller Information</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {product.profiles?.full_name ? product.profiles.full_name.substring(0,2).toUpperCase() : 'AN'}
                </div>
                <div>
                  <strong>{product.profiles?.full_name || 'Anonymous'}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Seller</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(product.contact_phone || product.profiles?.phone_number) && (
                  <a href={`tel:${product.contact_phone || product.profiles.phone_number}`} className="btn" style={{ background: 'linear-gradient(135deg,#059669,#10b981)', color: 'white', textDecoration: 'none', textAlign: 'center' }}>📞 Call Seller</a>
                )}
                {(product.contact_whatsapp || product.profiles?.whatsapp_number) && (
                  <a href={`https://wa.me/${product.contact_whatsapp || product.profiles.whatsapp_number}`} target="_blank" rel="noreferrer" className="btn" style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: 'white', textDecoration: 'none', textAlign: 'center' }}>💬 WhatsApp</a>
                )}
                <button onClick={() => handleEnquire(product.id, product.seller_id)} className="btn btn-outline" style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}>📨 Send Enquiry</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

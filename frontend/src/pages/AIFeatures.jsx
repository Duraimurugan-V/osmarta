import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AIFeatures() {
  const [insights, setInsights] = useState([]);
  const [trending, setTrending] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('farm');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/ai/insights`)
      .then(res => res.json())
      .then(data => {
        setInsights(data.insights);
        setTrending(data.trending_products || []);
      })
      .catch(err => console.error("Could not load insights:", err));
  }, []);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/ai/predict-price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: productName, category })
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to Python Backend. Make sure it is running on port 8000.");
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', borderRadius: 'var(--radius-2xl)', marginBottom: 'var(--space-8)' }}>
        <h1 style={{ margin: 0, color: 'white' }}>🤖 AI Intelligence Hub</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)' }}>Powered by our Serverless Python Backend</p>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* Predictor */}
        <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Price Predictor</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Get AI-driven market pricing estimations before you list.</p>
          <form onSubmit={handlePredict}>
            <input required type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter product..." style={{ width: '100%', padding: '0.75rem', marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }} />
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'white' }}>
              <option value="farm">🥬 Farm Produce</option>
              <option value="product">🛍️ Retail Product</option>
              <option value="service">🔧 Service</option>
            </select>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Analyzing...' : 'Predict Price'}
            </button>
          </form>

          {prediction && (
            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: 'rgba(16,185,129,0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>₹{prediction.predicted_price}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Confidence: {prediction.confidence * 100}%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Trend: {prediction.trend === 'up' ? <span style={{color: '#10b981'}}>📈 Rising</span> : <span style={{color: '#ef4444'}}>📉 Falling</span>}
              </div>
            </div>
          )}
        </div>

        {/* Insights */}
        <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Live Market Insights</h3>
          {insights.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Loading insights from Python backend...</p> : (
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {insights.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Trending Products Row */}
      {trending.length > 0 && (
        <div style={{ marginTop: 'var(--space-8)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>🔥 Trending / Top Sale Products</h2>
          <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {trending.map((t, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-brand)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <h4 style={{ margin: 0 }}>{t.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>{t.sales} Sales</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{t.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

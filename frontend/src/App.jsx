import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ShareListing from './pages/ShareListing';
import CommunityReviews from './pages/CommunityReviews';
import OwnerInbox from './pages/OwnerInbox';
import AIFeatures from './pages/AIFeatures';
import AuthPage from './pages/AuthPage';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="app-container" data-theme="dark">
      <Header />
      <main style={{ paddingTop: 'var(--header-total, 120px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/share-listing" element={<ShareListing />} />
          <Route path="/reviews" element={<CommunityReviews />} />
          <Route path="/owner-inbox" element={<OwnerInbox />} />
          <Route path="/ai-features" element={<AIFeatures />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

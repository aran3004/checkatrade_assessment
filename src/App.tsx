import React, { useState } from 'react';
import './App.css';

// Define trade interface
interface Trade {
  tradeName: string;
  description: string;
  icon?: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API endpoint - update with your deployed backend URL if needed
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trade icons mapping
  const getTradeIcon = (tradeName: string): string => {
    const tradeIcons: {[key: string]: string} = {
      "Plumber": "🔧",
      "Electrician": "⚡",
      "Carpenter": "🪓",
      "Roofer": "🏠",
      "Builder": "👷",
      "Gardener": "🌱",
      "Painter": "🖌️",
      "Decorator": "🖌️"
    };
    
    return tradeIcons[tradeName] || "👨‍🔧";
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <div className="logo">Checkatrade</div>
          <nav>
            <ul>
              <li><a href="#homeowner">Homeowner</a></li>
              <li><a href="#trades">Trades</a></li>
              <li><a href="#signup" className="trade-signup">Trade sign up</a></li>
              <li><a href="#download" className="download-app">Download app</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Find a trusted tradesperson</h1>
          <p>AI-powered recommendations you can rely on</p>
          
          <div className="query-form">
            <form onSubmit={handleSubmit}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your home improvement problem (e.g., My bathroom sink is leaking)"
                rows={4}
                required
                disabled={isLoading}
              />
              <button type="submit" className="search-button" disabled={isLoading}>
                {isLoading ? 'Finding Trades...' : 'Get Recommendations'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <main>
        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Loading State */}
        {isLoading && <div className="loading">Finding the right trades for you...</div>}

        {/* Recommendations */}
        {!isLoading && recommendations.length > 0 && (
          <div className="recommendation-list">
            <h2>Recommended Trades</h2>
            <div className="trade-cards">
              {recommendations.map((trade, index) => (
                <div key={index} className="trade-card">
                  <div className="trade-icon">{getTradeIcon(trade.tradeName)}</div>
                  <h3>{trade.tradeName}</h3>
                  <p>{trade.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && recommendations.length === 0 && !error && (
          <div className="categories-section">
            <h2>Browse our most popular categories</h2>
            <div className="categories">
              <div className="category">
                <div className="category-icon">🔧</div>
                <p>Plumber</p>
              </div>
              <div className="category">
                <div className="category-icon">⚡</div>
                <p>Electrician</p>
              </div>
              <div className="category">
                <div className="category-icon">🏠</div>
                <p>Roofer</p>
              </div>
              <div className="category">
                <div className="category-icon">👷</div>
                <p>Builder</p>
              </div>
              <div className="category">
                <div className="category-icon">🌱</div>
                <p>Gardener</p>
              </div>
              <div className="category">
                <div className="category-icon">🖌️</div>
                <p>Painter / Decorator</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Checkatrade Labs Technical Assessment</p>
      </footer>
    </div>
  );
}

export default App;
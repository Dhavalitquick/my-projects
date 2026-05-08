import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, Apple, Globe } from 'lucide-react';
import appsData from '../data/apps.json';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Use passed state if available (for newly added apps), else find in JSON
  const app = location.state?.app || appsData.find((a: any) => a.id === parseInt(id || '0'));

  if (!app) {
    return <div className="container">App not found</div>;
  }

  return (
    <div className="container detail-view">
      <Link to="/" className="back-btn">
        <ArrowLeft size={20} /> Back to Hub
      </Link>

      <section className="detail-hero">
        <div className="app-logo-large">
          <img src={app.logo} alt={app.name} className="app-logo" />
        </div>
        <div className="detail-content">
          <h1>{app.name}</h1>
          <div className="links-group">
            {app.playstoreLink && (
              <a href={app.playstoreLink} target="_blank" rel="noopener noreferrer" className="store-link playstore">
                <Play size={20} fill="currentColor" /> Play Store
              </a>
            )}
            {app.appstoreLink && (
              <a href={app.appstoreLink} target="_blank" rel="noopener noreferrer" className="store-link appstore">
                <Apple size={20} fill="currentColor" /> App Store
              </a>
            )}
            {app.websiteLink && (
              <a href={app.websiteLink} target="_blank" rel="noopener noreferrer" className="store-link website">
                <Globe size={20} /> Official Website
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="description-section">
        <h2>About this App</h2>
        <p>{app.desc}</p>
      </section>

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>App ID: {app.id} • Information provided by App Universe</p>
      </div>
    </div>
  );
};

export default Detail;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sun, Moon, Plus } from 'lucide-react';
import initialAppsData from '../data/apps.json';
import AddAppDialog from '../components/AddAppDialog';

interface AppItem {
  id: number;
  name: string;
  logo: string;
  desc: string;
  playstoreLink: string;
  appstoreLink: string;
  websiteLink: string;
}

interface HomeProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppItem[]>(initialAppsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddApp = (newAppData: Omit<AppItem, 'id'>) => {
    const newApp: AppItem = {
      ...newAppData,
      id: apps.length > 0 ? Math.max(...apps.map(a => a.id)) + 1 : 0
    };
    setApps([newApp, ...apps]);
    setIsDialogOpen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {/* <button className="add-btn" onClick={() => setIsDialogOpen(true)}>
            <Plus size={20} /> Add App
          </button> */}
        </div>
        <h1>App Universe</h1>
        <p>Explore our collection of innovative mobile solutions designed to simplify your life and enhance your creativity.</p>
      </header>

      <div className="app-grid">
        {apps.map((app, index) => (
          <div
            key={app.id}
            className="app-card"
            onClick={() => navigate(`/app/${app.id}`, { state: { app } })}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="app-logo-wrapper">
              <img src={app.logo} alt={app.name} className="app-logo" />
            </div>

            <div className="app-info">
              <h3>{app.name}</h3>
              <p>{app.desc}</p>
            </div>

            <div className="card-footer">
              <span className="badge">
                {app.playstoreLink && app.appstoreLink ? 'Multi-platform' : 'Mobile App'}
              </span>
              <div className="back-btn" style={{ margin: 0 }}>
                View Details <ChevronRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddAppDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddApp}
      />
    </div>
  );
};

export default Home;

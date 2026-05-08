import React, { useState, useRef, useEffect } from 'react';
import { X, Link, PlayCircle, Apple } from 'lucide-react';

interface AppItem {
  id: number;
  name: string;
  logo: string;
  desc: string;
  playstoreLink: string;
  appstoreLink: string;
  websiteLink: string;
}

interface AddAppDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Omit<AppItem, 'id'>) => void;
}

const AddAppDialog: React.FC<AddAppDialogProps> = ({ isOpen, onClose, onAdd }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    desc: '',
    playstoreLink: '',
    appstoreLink: '',
    websiteLink: ''
  });

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo || !formData.desc) {
      alert('Please fill in all mandatory fields');
      return;
    }
    onAdd(formData);
    setFormData({
      name: '',
      logo: '',
      desc: '',
      playstoreLink: '',
      appstoreLink: '',
      websiteLink: ''
    });
  };

  return (
    <dialog ref={dialogRef} onCancel={onClose}>
      <div className="custom-dialog">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>Add New Application</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fields marked with * are mandatory</p>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="dialog-body">
          <div className="form-group">
            <label>App Name *</label>
            <input
              type="text"
              placeholder="e.g. Palta App"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Logo URL *</label>
            <input
              type="url"
              placeholder="https://example.com/logo.png"
              value={formData.logo}
              onChange={e => setFormData({ ...formData, logo: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              rows={4}
              placeholder="Describe your application features and purpose..."
              value={formData.desc}
              onChange={e => setFormData({ ...formData, desc: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Play Store Link</label>
              <div style={{ position: 'relative' }}>
                <PlayCircle size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="url"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Play Store URL"
                  value={formData.playstoreLink}
                  onChange={e => setFormData({ ...formData, playstoreLink: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>App Store Link</label>
              <div style={{ position: 'relative' }}>
                <Apple size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="url"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="App Store URL"
                  value={formData.appstoreLink}
                  onChange={e => setFormData({ ...formData, appstoreLink: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Official Website</label>
            <div style={{ position: 'relative' }}>
              <Link size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="url"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="https://www.example.com"
                value={formData.websiteLink}
                onChange={e => setFormData({ ...formData, websiteLink: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="add-btn">Create Application</button>
        </div>
      </form>
    </dialog>
  );
};

export default AddAppDialog;

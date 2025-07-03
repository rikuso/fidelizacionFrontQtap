// src/components/UserCard.jsx
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserCard({ uid, token }) {
  useEffect(() => {
    // cualquier animación si gustas
  }, []);

  return (
    <div className="user-card-container">
      <div className="card user-card shadow-lg" data-aos="zoom-in">
        <div className="card-body text-center">
          <h5 className="card-title">Token Actual</h5>
          <p className="card-text display-6 text-primary">{token || '0'}</p>
          <small className="text-muted">UID: {uid}</small>
        </div>
      </div>

      <style>{`
        .user-card-container {
          position: relative;
          margin-top: -60px;
          display: flex;
          justify-content: center;
        }
        .user-card {
          width: 320px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}

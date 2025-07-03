// src/components/InviteModal.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InviteModal({ show, onClose, refLink }) {
  if (!show) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invita a un amigo</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p>Comparte este enlace y gana más puntos:</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" readOnly value={refLink} />
              <button className="btn btn-outline-secondary" onClick={() => navigator.clipboard.writeText(refLink)}>
                Copiar
              </button>
            </div>
            <div className="d-flex justify-content-around">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Facebook
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(refLink)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

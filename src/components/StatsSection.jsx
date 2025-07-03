// src/components/StatsSection.jsx
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function StatsSection({ stats }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="stats-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5" data-aos="fade-up">Tus Estadísticas</h2>
        <div className="row text-center gx-4">
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-card p-4 h-100 shadow-sm rounded-3">
              <i className="bi bi-eye-fill fs-1 text-primary mb-3"></i>
              <h3 className="fw-bold">{stats.pageViews}</h3>
              <p className="mb-0">Visitas a la página</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-card p-4 h-100 shadow-sm rounded-3">
              <i className="bi bi-hand-index-thumb-fill fs-1 text-success mb-3"></i>
              <h3 className="fw-bold">{stats.totalClicks}</h3>
              <p className="mb-0">Clicks en promociones</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-card p-4 h-100 shadow-sm rounded-3">
              <i className="bi bi-clock-history fs-1 text-warning mb-3"></i>
              <h3 className="fw-bold">{new Date(stats.lastSeen).toLocaleDateString()}</h3>
              <p className="mb-0">Última visita</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

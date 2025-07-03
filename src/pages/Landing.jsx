// src/pages/Landing.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { getUserData, getUserStats, postEventsBatch } from '../services/api';
import Carousel from '../components/PromosCarousel';
import StatsAlert from '../components/StatsSection';
import RegisterModal from '../components/RegisterModal';
import SocialLinks from '../components/SocialSection';

// Datos estáticos de promociones temporales
const staticPromos = [
  {
    id: 1,
    title: 'Descuento Verano',
    description: '15% de descuento en productos seleccionados.',
    shortDesc: '15% en productos veraniegos',
    discount: 15,
    imageUrl: '/assets/promo/descargar.jpg',
    link: '/promos/verano',
  },
  {
    id: 2,
    title: '2x1 en Accesorios',
    description: 'Compra uno y llévate otro GRATIS.',
    shortDesc: '2x1 accesorios',
    discount: 50,
    imageUrl: '/assets/promo2.jpg',
    link: '/promos/accesorios',
  },
  {
    id: 3,
    title: 'Envío Gratis',
    description: 'Envío sin costo en pedidos mayores a $50.',
    shortDesc: 'Envío gratis',
    discount: 0,
    imageUrl: '/assets/promo3.jpg',
    link: '/promos/envio',
  }
];

export default function Landing() {
  const { uid } = useParams();
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Generar o recuperar sessionId
  const sessionIdRef = useRef(
    sessionStorage.getItem('sessionId') || crypto.randomUUID()
  );
  useEffect(() => {
    sessionStorage.setItem('sessionId', sessionIdRef.current);
  }, []);

  // Ref para acumular eventos
  const eventsRef = useRef([]);
  const trackEvent = (eventType, extra = {}) => {
    eventsRef.current.push({
      id: crypto.randomUUID(),
      uid,
      eventType,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      metadata: { platform: 'web', ...extra },
      sessionId: sessionIdRef.current
    });
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchData = async () => {
      trackEvent('pageView', { critical: true });
      try {
        const userRes = await getUserData(uid);
        setData(userRes.data);

        const statsRes = await getUserStats(uid);
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const sendBatch = () => {
      const batch = eventsRef.current;
      if (!batch.length) return;
      postEventsBatch(batch)
        .then(() => {
          eventsRef.current = [];
        })
        .catch(console.error);
    };

    const interval = setInterval(sendBatch, 30000);
    window.addEventListener('beforeunload', sendBatch);
    return () => {
      clearInterval(interval);
      sendBatch();
      window.removeEventListener('beforeunload', sendBatch);
    };
  }, [uid]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
  if (!data) {
    return (
      <p className="text-danger text-center mt-5">
        No se encontraron datos para este UID.
      </p>
    );
  }

  const handlePromoClick = async (promo) => {
    trackEvent('buttonClick', { promoId: promo.id, critical: true });
    await postEventsBatch(eventsRef.current);
    window.location.href = promo.link;
  };

  const handleSocialClick = (platform) => {
    trackEvent('socialClick', { platform, critical: true });
    window.open(`https://${platform}.com`, '_blank');
  };

  const handleInvite = () => {
    trackEvent('inviteFriend', { critical: true });
    setShowModal(true);
  };

  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="overlay"></div>
        <div className="hero-content" data-aos="fade-down">
          <h1 className="display-4 fw-bold">¡Bienvenido, {data.cliente?.nombre}!</h1>
          <p className="lead mt-3">
            Disfruta promociones exclusivas y acumula puntos especiales
          </p>
          <button
            className="btn btn-lg btn-light mt-4"
            onClick={handleInvite}
          >
            Invita a un amigo
          </button>
        </div>
      </section>

      {/* User Card */}
      <div className="user-card-container">
        <div className="card user-card shadow-lg" data-aos="zoom-in">
          <div className="card-body text-center">
            <h5 className="card-title">Token Actual</h5>
            <p className="card-text display-6 text-primary">
              {data.fisico?.token || '0'}
            </p>
            <small className="text-muted">UID: {data.uid}</small>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <section className="stats-section py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5" data-aos="fade-up">
              Tus Estadísticas
            </h2>
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
                  <h3 className="fw-bold">
                    {new Date(stats.lastSeen).toLocaleDateString()}
                  </h3>
                  <p className="mb-0">Última visita</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Carousel de Promociones */}
      <section className="promos-section py-5">
        <div className="container">
          <h2 className="text-center mb-4" data-aos="fade-up">
            Promociones Destacadas
          </h2>
          <Carousel promos={staticPromos} onPromoClick={handlePromoClick} />
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="benefits-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4" data-aos="fade-up">
            Tus Beneficios Exclusivos
          </h2>
          <div className="row gx-4 gy-4">
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="100">
              <i className="bi bi-gift-fill fs-1 text-primary mb-3"></i>
              <h5>Descuentos Privados</h5>
              <p>Accede a ofertas especiales solo para miembros registrados.</p>
            </div>
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-trophy-fill fs-1 text-success mb-3"></i>
              <h5>Sorteos Mensuales</h5>
              <p>Participa automáticamente en sorteos exclusivos cada mes.</p>
            </div>
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-stars fs-1 text-warning mb-3"></i>
              <h5>Puntos de Lealtad</h5>
              <p>Acumula puntos con cada compra y canjéalos por recompensas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Redes Sociales Section */}
      <section className="social-section py-5 text-white text-center" data-aos="fade-up">
        <div className="overlay-social"></div>
        <div className="container position-relative">
          <h2 className="mb-4">Conéctate con Nosotros</h2>
          <div className="d-flex justify-content-center gap-4">
            {['instagram', 'facebook', 'tiktok'].map((icon) => (
              <button
                key={icon}
                className="btn btn-link text-white fs-2 social-btn"
                onClick={() => handleSocialClick(icon)}
              >
                <i className={`bi bi-${icon}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Invitación */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invita a un amigo</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Comparte este enlace y gana más puntos:</p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={`${window.location.origin}/register?ref=${data.uid}`}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/register?ref=${data.uid}`
                      )
                    }
                  >
                    Copiar
                  </button>
                </div>
                <div className="d-flex justify-content-around">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${window.location.origin}/register?ref=${data.uid}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `${window.location.origin}/register?ref=${data.uid}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos personalizados */}
      <style>{`
        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 60vh;
          background: linear-gradient(135deg, #4e54c8, #8f94fb);
          overflow: hidden;
        }
        .hero-section .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.45);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          padding: 0 1rem;
        }

        /* User Card */
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

        /* Stats Section */
        .stats-card {
          background: #fff;
        }

        /* Promos Section handled in Carousel component */

        /* Benefits Section */
        .benefits-section i {
          font-size: 3rem;
        }

        /* Social Section */
        .social-section {
          position: relative;
          background: url('/assets/social-bg.jpg') center center / cover no-repeat;
        }
        .social-section .overlay-social {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
        }
        .social-section .social-btn:hover {
          transform: scale(1.1);
          transition: transform 0.2s;
        }

        /* Modal Backdrop */
        .modal-backdrop.show {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

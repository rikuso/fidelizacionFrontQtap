// src/components/PromosCarousel.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import 'aos/dist/aos.css';

export default function PromosCarousel({ promos, onPromoClick }) {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="promo-carousel-container" data-aos="fade-up">
      <div id="promoCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicadores */}
        <div className="carousel-indicators">
          {promos.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#promoCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner rounded-4 shadow-lg">
          {promos.map((promo, idx) => (
            <div
              key={promo.id}
              className={`carousel-item ${idx === 0 ? 'active' : ''}`}
            >
              <div className="promo-slide position-relative">
                <img
                  src={promo.imageUrl}
                  loading="lazy"
                  className="d-block w-100"
                  alt={`Promoción ${promo.title}: ${promo.shortDesc}`}
                />
                <div className="promo-overlay d-flex flex-column justify-content-center align-items-center text-center">
                  {promo.discount > 0 && (
                    <span className="badge bg-danger fs-5 mb-2 animate__bounceIn">
                      -{promo.discount}%
                    </span>
                  )}
                  <h3 className="fw-bold text-white">{promo.title}</h3>
                  <p className="text-light mb-3">{promo.description}</p>
                  <button
                    className="btn btn-warning btn-lg animate__pulse animate__infinite"
                    onClick={() => onPromoClick(promo)}
                  >
                    ¡Aprovechar ahora!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles prev/next */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#promoCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#promoCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <style>{`
        .promo-carousel-container {
          margin-bottom: 3rem;
        }

        .promo-slide {
          height: 300px;
          overflow: hidden;
        }
        @media (max-width: 576px) {
          .promo-slide { height: 200px; }
        }
        @media (min-width: 1200px) {
          .promo-slide { height: 400px; }
        }

        .promo-slide img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .promo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 1rem;
        }
        .promo-slide:hover .promo-overlay {
          opacity: 1;
        }

        .carousel-item.active .promo-overlay {
          animation: fadeInOverlay 0.5s ease-in-out forwards;
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .promo-overlay h3 {
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .promo-overlay p {
          color: #f0f0f0;
          margin-bottom: 1rem;
        }
        .promo-overlay .btn-warning {
          border-radius: 2rem;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: invert(100%);
        }

        .carousel-indicators [data-bs-target] {
          background-color: rgba(255, 255, 255, 0.7);
        }
        .carousel-indicators .active {
          background-color: #ffc107;
        }
      `}</style>
    </div>
  );
}

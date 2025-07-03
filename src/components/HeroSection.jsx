// src/components/HeroSection.jsx
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection({ userName, onInvite }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="hero-section text-white text-center d-flex align-items-center justify-content-center">
      <div className="overlay"></div>
      <div className="hero-content" data-aos="fade-down">
        <h1 className="display-4 fw-bold">¡Bienvenido, {userName}!</h1>
        <p className="lead mt-3">Disfruta promociones exclusivas y acumula puntos especiales</p>
        <button className="btn btn-lg btn-light mt-4" onClick={onInvite}>
          Invita a un amigo
        </button>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}

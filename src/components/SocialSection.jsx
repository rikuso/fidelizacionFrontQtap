// src/components/SocialSection.jsx
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SocialSection({ onSocialClick }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="social-section py-5 text-white text-center" data-aos="fade-up">
      <div className="overlay-social"></div>
      <div className="container position-relative">
        <h2 className="mb-4">Conéctate con Nosotros</h2>
        <div className="d-flex justify-content-center gap-4">
          {['instagram', 'facebook', 'tiktok'].map((icon) => (
            <button
              key={icon}
              className="btn btn-link text-white fs-2 social-btn"
              onClick={() => onSocialClick(icon)}
            >
              <i className={`bi bi-${icon}`} />
            </button>
          ))}
        </div>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}

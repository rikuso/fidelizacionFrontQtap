// src/components/BenefitsSection.jsx
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function BenefitsSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="benefits-section py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-4" data-aos="fade-up">Tus Beneficios Exclusivos</h2>
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
  );
}

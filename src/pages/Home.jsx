import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteByUid, registerCliente } from '../services/api';

export default function Home() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '' });
  const [checked, setChecked] = useState(false); // nuevo flag
  useEffect(() => {
    if (checked) return; // ya comprobamos, no volvemos a llamar
    setChecked(true);
    async function fetchCliente() {
      try {
        await getClienteByUid(uid);
        // Si existe, redirige al landing
        navigate(`/landing/${uid}`);
      } catch (err) {
        // No existe, muestra formulario
        setLoading(false);
      }
    }
    fetchCliente();
  }, [uid, navigate]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerCliente({ uid, ...formData });
      navigate(`/landing/${uid}`);
    } catch (err) {
      alert('Error al registrar: ' + err.message);
    }
  };

  if (loading) return <p className="text-center mt-5">Verificando usuario...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <input
            name="nombre"
            placeholder="Nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="telefono"
            placeholder="Teléfono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email (opcional)"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrar</button>
      </form>
    </div>
  );
}

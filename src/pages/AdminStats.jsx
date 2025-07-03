import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { listStats } from '../services/api';

export default function AdminStats() {
  const [statsList, setStatsList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch stats, optionally with cursor
  const fetchStats = async (cursor = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await listStats({ limit: 50, startAfter: cursor });
      // res { data: [...], nextCursor }
      setStatsList(prev => [...prev, ...res.data]);
      setNextCursor(res.nextCursor);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Estadísticas de Usuarios</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>UID</th>
              <th>Token</th>
              <th>Visitas</th>
              <th>Clicks</th>
              <th>Última Visita</th>
              <th>Última Página</th>
            </tr>
          </thead>
          <tbody>
            {statsList.map(item => (
              <tr key={item.uid}>
                <td>{item.uid}</td>
                <td>{item.token}</td>
                <td>{item.pageViews}</td>
                <td>{item.totalClicks}</td>
                <td>{new Date(item.lastSeen).toLocaleString()}</td>
                <td>{item.lastPage || '-'}</td>
              </tr>
            ))}
            {statsList.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center py-4">No hay estadísticas disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {loading && <p className="text-center">Cargando...</p>}
      {nextCursor && !loading && (
        <div className="text-center mb-5">
          <button className="btn btn-outline-primary" onClick={() => fetchStats(nextCursor)}>
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}

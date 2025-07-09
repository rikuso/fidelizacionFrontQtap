//const BASE_URL = 'http://localhost:3000/api/v1'; // Cambia si usas otro host
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://pruebaqtap2.onrender.com/api/v1';


export async function getClienteByUid(uid) {
  const res = await fetch(`${BASE_URL}/clientes/${uid}`, {
    headers: { 'x-api-key': API_KEY }
  });
  if (!res.ok) throw new Error('Cliente no encontrado');
  return await res.json();
}

export async function registerCliente(data) {
  const res = await fetch(`${BASE_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al registrar cliente');
  return await res.json();
}

export async function getUserData(uid) {
  const res = await fetch(`${BASE_URL}/users/${uid}`, {
    headers: {
      'x-api-key': API_KEY
    }
  });
  if (!res.ok) throw new Error('Usuario no encontrado');
  return await res.json();
}

/**
 * Envía un lote de eventos al backend:
 * Cada evento debe tener:
 * { id, uid, eventType, timestamp, page, metadata, sessionId }
 */
export async function postEventsBatch(events) {
  const res = await fetch(`${BASE_URL}/events/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(events),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error enviando eventos: ${errText}`);
  }
  return await res.json();
}

/**
 * Obtiene estadísticas básicas de un usuario:
 * { pageViews, totalClicks, lastSeen, lastPage }
 */
export async function getUserStats(uid) {
  const res = await fetch(`${BASE_URL}/stats/uids/${uid}`, {
    headers: { 'x-api-key': API_KEY }
  });
  if (!res.ok) throw new Error('Estadísticas no encontradas');
  return await res.json();
}


/**
 * Lista estadísticas paginadas para AdminStats:
 * @param {{ limit?: number, startAfter?: string }} params
 * @returns { data: Array<{ uid, token, lastSeen, pageViews, totalClicks, lastPage }>, nextCursor: string }
 */
export async function listStats({ limit = 100, startAfter = null } = {}) {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  if (startAfter) params.set('startAfter', startAfter);

  const res = await fetch(`${BASE_URL}/stats/uids?${params.toString()}`, {
    headers: { 'x-api-key': API_KEY }
  });
  if (!res.ok) throw new Error('Error listando estadísticas');
  return await res.json();
}
// ✅ Devuelve una fecha en formato DD/MM/YYYY
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

// ✅ Devuelve la hora en formato HH:MM (24h)
export function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ✅ Verifica si una fecha está en el pasado
export function isPastDate(date) {
  return new Date(date).getTime() < Date.now();
}

// ✅ Calcula la diferencia en días entre dos fechas
export function daysBetween(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.abs(e - s);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

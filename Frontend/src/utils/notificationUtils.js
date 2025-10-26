import { formatDate, formatTime } from "./dateUtils";

// ✅ Genera el texto de un recordatorio de cita
export function generateAppointmentReminder(patientName, date) {
  return `Hola ${patientName}, te recordamos tu cita el ${formatDate(
    date
  )} a las ${formatTime(date)}. ¡Gracias por confiar en nosotros!`;
}

// ✅ Marca una notificación como leída
export function markAsRead(notifications, id) {
  return notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
}

// ✅ Filtra notificaciones no leídas
export function getUnreadNotifications(notifications) {
  return notifications.filter((n) => !n.read);
}

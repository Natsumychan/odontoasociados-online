// ✅ Verifica correo electrónico válido
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Verifica teléfono (mínimo 7 dígitos, solo números)
export function isValidPhone(phone) {
  return /^[0-9]{7,15}$/.test(phone);
}

// ✅ Valida campos requeridos
export function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

// ✅ Valida que una cita sea en horario laboral (8:00 a 18:00)
export function isWithinWorkingHours(date) {
  const d = new Date(date);
  const hour = d.getHours();
  return hour >= 8 && hour < 18;
}

// ✅ Formatea precios en COP
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}

// ✅ Capitaliza la primera letra de un texto
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// ✅ Combina clases de Tailwind condicionalmente
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ✅ Petición GET genérica
export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error en la solicitud');
  return response.json();
}

// ✅ Petición POST genérica
export async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error en la solicitud');
  return response.json();
}
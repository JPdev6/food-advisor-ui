const API = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
}

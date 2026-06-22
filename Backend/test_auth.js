async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw data || new Error(`Request failed: ${res.status}`);
  return data;
}

async function run() {
  const email = `auth-test-${Date.now()}@example.com`;
  const password = 'password123';

  try {
    const register = await postJson('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email,
      password,
    });
    console.log('Register response:', register);
  } catch (e) {
    console.error('Register error:', e);
  }

  try {
    const login = await postJson('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    console.log('Login response:', login);
  } catch (e) {
    console.error('Login error:', e);
  }
}

run();

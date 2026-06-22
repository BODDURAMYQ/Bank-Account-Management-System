async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await res.json();
}

(async () => {
  try {
    const user = await postJson('http://localhost:5000/api/auth/register', {
      name: 'UI Test User',
      email: 'ui-test@example.com',
      password: 'Password123',
    });
    console.log('USER', user);
  } catch (e) {
    console.error('USER ERROR', e);
  }

  try {
    const account = await postJson('http://localhost:5000/api/accounts', {
      accountNumber: 'UI-ACC-002',
      accountHolderName: 'UI Test User',
      balance: 1000,
    });
    console.log('ACCOUNT', account);
  } catch (e) {
    console.error('ACCOUNT ERROR', e);
  }
})();

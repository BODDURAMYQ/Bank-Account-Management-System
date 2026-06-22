const fetch = require('node:fetch');

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
    const account = await postJson('http://localhost:5000/api/accounts', {
      accountNumber: 'UI-ACC-001',
      accountHolderName: 'UI Test User',
      balance: 500,
    });
    console.log(account);
  } catch (e) {
    console.error('Account creation failed', e);
  }
})();

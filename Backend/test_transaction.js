

async function postJson(url, body, token) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw data || new Error(`Request failed: ${res.status}`);
  return data;
}

async function run() {
  try {
    const email = `transaction-test-${Date.now()}@example.com`;
    const password = 'password123';

    const user = await postJson('http://localhost:5000/api/auth/register', {
      name: 'Transaction Test User',
      email,
      password
    });
    const token = user.token;

    const deposit = await postJson('http://localhost:5000/api/transactions', {
      accountId: user.accountId,
      transactionType: 'Deposit',
      amount: 1000
    }, token);
    console.log('Deposit response:', deposit);

    const withdraw = await postJson('http://localhost:5000/api/transactions', {
      accountId: user.accountId,
      transactionType: 'Withdraw',
      amount: 100
    }, token);
    console.log('Withdraw response:', withdraw);

    const res = await fetch('http://localhost:5000/api/transactions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const txs = await res.json();
    const related = txs.filter((t) => {
      const transactionAccountId = t.accountId && (t.accountId._id || t.accountId);
      return transactionAccountId === user.accountId;
    });
    console.log('Related transactions:', related);
  } catch (e) {
    console.error('Test error:', e);
  }
}

run();

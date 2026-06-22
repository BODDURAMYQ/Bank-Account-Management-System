const connectDB = require('./config/db');
const Account = require('./models/Account');

(async () => {
  try {
    await connectDB();
    const id = '6a3425365e1df527043a4187';
    const acc = await Account.findById(id).lean();
    if (acc) console.log('FOUND', JSON.stringify(acc));
    else console.log('NOT_FOUND');
  } catch (err) {
    console.error('ERR', err.message);
  } finally {
    process.exit();
  }
})();

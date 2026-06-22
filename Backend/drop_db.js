const mongoose = require('mongoose');

(async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bankdb';
    await mongoose.connect(uri);
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped');
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error('Drop DB error:', e);
    process.exit(1);
  }
})();

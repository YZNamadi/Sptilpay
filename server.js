const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));


// Sync Database
db.Sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Failed to sync DB:', err));

  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

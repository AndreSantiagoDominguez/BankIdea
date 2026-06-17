const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
require('./models/user.model');
require('./models/project.model');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth',     require('./routes/auth.routes'));
app.use('/projects', require('./routes/project.routes'));

app.get('/', (_, res) => res.json({ status: 'DevLog API running' }));

const PORT = process.env.PORT || 3000;

// sync({ alter: true }) actualiza las tablas si cambian los modelos
// sync({ force: true }) las borra y recrea (solo en desarrollo)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Server en puerto ${PORT}`));
  })
  .catch(err => console.error('Error conectando a la DB:', err));

const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Todos los campos son requeridos' });

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(409).json({ message: 'El email ya está registrado' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const { password: _, ...safeUser } = user.toJSON();
    res.status(201).json({ user: safeUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email y contraseña requeridos' });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: 'Credenciales incorrectas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: 'Credenciales incorrectas' });

    const { password: _, ...safeUser } = user.toJSON();
    res.status(200).json({ user: safeUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };

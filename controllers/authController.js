const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Correo incorrecto' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

module.exports = { loginAdmin };

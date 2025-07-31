const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const admin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword
      });
      await admin.save();
      console.log('✅ Admin creado correctamente');
    } else {
      console.log('ℹ️ Admin ya existente');
    }
  } catch (error) {
    console.error('❌ Error creando admin:', error);
  }
};

module.exports = seedAdmin;

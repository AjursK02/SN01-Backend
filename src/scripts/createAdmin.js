const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/database');
const Admin = require('../models/adminSchema');

(async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: 'admin@example.com' });
    if (!existing) {
      await Admin.create({ email: 'admin@example.com', password: 'admin123' });
      console.log('✅ Admin created successfully');
    } else {
      console.log('⚠️ Admin already exists');
    }

    await require('mongoose').disconnect();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  }
})();

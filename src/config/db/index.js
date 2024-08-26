const mongoose = require('mongoose');

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1/e_learning');
    console.log('Connect successfully!');
  } catch (error) {
    console.log('Connect failure!');
  }
}

module.exports = { connect };

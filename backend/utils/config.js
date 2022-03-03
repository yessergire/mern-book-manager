require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const logger = require('./logger')

const PORT = process.env.PORT
const isTestEnv = process.env.NODE_ENV === 'test'

const dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const MONGODB_URI = isTestEnv ? mongoServer.getUri() : process.env.MONGODB_URI

  try {
    logger.info('connecting to', MONGODB_URI)
    await mongoose.connect(MONGODB_URI)
    logger.info('connected to MongoDB')
  } catch(error) {
    logger.error('error:', error.message)
  }
}

module.exports = {
  dbConnect,
  PORT,
}
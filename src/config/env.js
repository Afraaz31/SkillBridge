const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/skillbridge",
  JWT_SECRET: process.env.JWT_SECRET || "skillbridge-dev-secret",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "30d",
  NODE_ENV: process.env.NODE_ENV || "development",
};

module.exports = config;

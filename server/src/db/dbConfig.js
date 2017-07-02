// DATABASE CONFIG.
module.exports = {
    dbName: process.env.DB_NAME || 'ezstock',
	username: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || 'sanyang123',
	host: process.env.DB_HOST || 'localhost',
	dialect: process.env.DB_DIALECT || 'mysql'
}
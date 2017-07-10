module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'Chat',
      script: './example/server.js',
      watch: true,
      env: {
        DB_NAME: 'ezstock',
        DB_USERNAME: 'root',
        DB_PASSWORD: 'sanyang123',
        DB_HOST: 'localhost',
        DB_DIALECT: 'mysql',
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */

};

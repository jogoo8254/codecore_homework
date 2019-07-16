// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cohorts_db'
    },
    migrations: {
      directory: 'db/migrations'
    }
  }
};

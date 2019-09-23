// Update with your config settings.

const localPg = {
  host: 'localhost',
  database: 'items',
  user: 'Admin',
  password: 'Testing1'
}
const productionDbConnection = process.env.DATABASE_URL || localPg

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/auth.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
      connection: {
        filename: './database/test.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      },
    },
    
    // staging: {
      //   client: 'postgresql',
      //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
    //     min: 2,
    //     max: 10
  //   },
  //   migrations: {
    //     tableName: 'knex_migrations'
  //   }
  // },
  
  production: {
    client: 'pg',
    connection: productionDbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  }

};
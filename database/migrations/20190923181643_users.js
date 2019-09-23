// USERS TABLE

exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
          tbl.increments(); 

          tbl
              .text('username', 255)
              .notNullable()
              .unique();
          tbl
              .text('password', 255)
              .notNullable();
    })

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
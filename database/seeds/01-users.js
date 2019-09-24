const bcrypt = require ("bcryptjs")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Admin', password: 'Testing1'},
        {username: 'FrontEnd', password: 'Testing1'},
        {username: 'Marketing', password: 'Testing1'}
      ]);
    });
};
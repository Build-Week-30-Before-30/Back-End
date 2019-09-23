// CATEGORIES TABLE AND INTERMEDIARY USER TABLE

exports.up = function(knex) {
    return knex.schema
    .createTable('categories', tbl => {
        tbl.increments();

        tbl
            .text('category_name')
            .notNullable()
    })

   
};

exports.down = function(knex) {
    return knex.schema
        // .dropTableIfExists('users_categories')
        .dropTableIfExists('categories')
};
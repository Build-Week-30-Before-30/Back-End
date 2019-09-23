// BUCKET LIST ITEMS TABLE


exports.up = function(knex) {
    return knex.schema
      .createTable('items', tbl => {
          tbl.increments();
  
          tbl
              .text('item_name')
              .notNullable()
          tbl
              .text('description')
          tbl
              .integer('user_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('users')
              .onDelete('RESTRICT')
              .onUpdate('CASCADE')
          tbl
              .integer('category_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('categories')
              .onDelete('RESTRICT')
              .onUpdate('CASCADE')
          tbl
              .boolean('privacy')
              .defaultTo(true)
          tbl
              .boolean('complete')
              .defaultTo(false)
          tbl
              .text('target_date')
      })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('items')
  };